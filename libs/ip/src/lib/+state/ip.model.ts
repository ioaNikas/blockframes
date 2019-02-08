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
  date: string,
  signer: string,
  isan: string,
}

/**
 * A factory function that creates Ip
 */
export function createIp(params?: Partial<Ip>, id?: string) {
  return { ...params, id, date: Date.now().toString() } as Ip;
}
