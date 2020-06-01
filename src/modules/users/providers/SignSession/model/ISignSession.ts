export default interface ISignSession {
  sign(payload: string | object, subject: string): string;
}
