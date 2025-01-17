import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { generate as passwordGenerator } from 'generate-password';
import { auth, db } from './internals/firebase';
import { userInvite } from './assets/mail-templates';
import { sendMail } from './internals/email';

type UserRecord = admin.auth.UserRecord;
type CallableContext = functions.https.CallableContext;

interface UserProposal {
  uid: string;
  email: string;
}

interface OrgProposal {
  id: string;
  name: string;
}

const onUserCreate = (user: UserRecord) => {
  const { email, uid } = user;

  const userDocRef = db.collection('users').doc(user.uid);

  // transaction to UPSERT the user doc
  return db.runTransaction(async tx => {
    const userDoc = await tx.get(userDocRef);

    if (userDoc.exists) {
      tx.update(userDocRef, { email, uid });
    } else {
      tx.set(userDocRef, { email, uid });
    }
  });
};

const findUserByMail = async (data: any, context: CallableContext): Promise<UserProposal[]> => {
  const prefix: string = decodeURIComponent(data.prefix);

  // Leave if the prefix is too short (do not search every users in the universe).
  if (prefix.length < 2) {
    return [];
  }

  // String magic to figure out a prefixEnd
  // Say prefix is 'aaa'. We want to search all strings between 'aaa' (prefix) and 'aab' (prefixEnd)
  // this will match: 'aaa', 'aaaa', 'aaahello', 'aaazerty', etc.
  const incLast: string = String.fromCharCode(prefix.slice(-1).charCodeAt(0) + 1);
  const prefixEnd: string = prefix.slice(0, -1) + incLast;

  return db
    .collection('users')
    .where('email', '>=', prefix)
    .where('email', '<', prefixEnd)
    .get()
    .then(query => {
      // leave if there are too many results.
      if (query.size > 10) {
        return [];
      }

      return query.docs.map(doc => ({ uid: doc.id, email: doc.data().email }));
    });
};

const findOrgByName = async (data: any, context: CallableContext): Promise<OrgProposal[]> => {
  const prefix: string = decodeURIComponent(data.prefix);

  // Leave if the prefix is too short (do not search every users in the universe).
  if (prefix.length < 2) {
    return [];
  }

  // String magic to figure out a prefixEnd
  // Say prefix is 'aaa'. We want to search all strings between 'aaa' (prefix) and 'aab' (prefixEnd)
  // this will match: 'aaa', 'aaaa', 'aaahello', 'aaazerty', etc.
  const incLast: string = String.fromCharCode(prefix.slice(-1).charCodeAt(0) + 1);
  const prefixEnd: string = prefix.slice(0, -1) + incLast;

  return db
    .collection('orgs')
    .where('name', '>=', prefix)
    .where('name', '<', prefixEnd)
    .get()
    .then(matchingOrgs => {
      // leave if there are too many results.
      if (matchingOrgs.size > 10) {
        return [];
      }

      return matchingOrgs.docs.map(matchingOrg => ({
        id: matchingOrg.id,
        name: matchingOrg.data().name
      }));
    });
};

const generatePassword = () =>
  passwordGenerator({
    length: 12,
    numbers: true
  });

const getOrCreateUserByMail = async (
  data: any,
  context: CallableContext
): Promise<UserProposal> => {
  const { email } = data;

  try {
    const user = await auth.getUserByEmail(email);
    return { uid: user.uid, email };
  } catch {
    const password = generatePassword();

    // User does not exists, send them an email.
    const user = await auth.createUser({
      email,
      password,
      emailVerified: true,
      disabled: false
    });

    await sendMail(userInvite(email, password));

    return { uid: user.uid, email };
  }
};

export { onUserCreate, findUserByMail, findOrgByName, getOrCreateUserByMail };
