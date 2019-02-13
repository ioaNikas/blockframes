export interface Ip {
  id: string;
  title: string,
  synopsis: string,
  version: string,
  genres: string[],
  type: string,
  authors: {firstName: string, lastName: string}[],
  fileUrl: string,
  ipHash: string,
  txHash: string,
  date: number,
  signer: string,
  isan: string,
  // UI
  active?: boolean
}

/**
 * A factory function that creates Ip
 */
export function createIp(params?: Partial<Ip>) {
  return params ? {
    id: params.id || '',
    title: params.title,
    synopsis: params.synopsis,
    version: params.version,
    genres: params.genres || [],
    type: params.type,
    authors: params.authors || [],
    fileUrl: params.fileUrl,
    ipHash: params.ipHash,
    txHash: params.txHash,
    date: Date.now(),
    signer: params.signer,
    isan: params.isan,
  } : {} as Ip;
}
