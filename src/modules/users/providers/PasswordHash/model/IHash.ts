export default interface IHash {
  hash(password: string): Promise<string>;
  compare(password: string, hashed: string): Promise<boolean>;
}
