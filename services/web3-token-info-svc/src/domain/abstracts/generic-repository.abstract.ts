export abstract class IGenericAccessKeyRepository<T> {
  abstract getAccessKeyData(key: string): Promise<T>;
}
