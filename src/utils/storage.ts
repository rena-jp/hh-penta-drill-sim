function getStorageKey(key: string) {
  const universe = unsafeWindow.HH_UNIVERSE;
  const id = unsafeWindow.shared.Hero.infos.id;
  return `${universe}-${id}-${key}`;
}

function getData<T>(key: string, defaultValue?: T): Promise<T> {
  return GM.getValue(getStorageKey(key), defaultValue);
}

function setData<T>(key: string, value: T): Promise<void> {
  return GM.setValue(getStorageKey(key), value);
}

export class LiteralDataPort<T> {
  constructor(
    private key: string,
    private defaultValue: T,
  ) {}
  read(): Promise<T> {
    return getData(this.key, this.defaultValue);
  }
  write(value: T): Promise<void> {
    return setData(this.key, value);
  }
}

export class ObjectDataPort<T> {
  constructor(
    private key: string,
    private defaultValue: T,
  ) {}
  async read(): Promise<T> {
    return { ...this.defaultValue, ...(await getData(this.key)) };
  }
  write(value: T): Promise<void> {
    return setData(this.key, value);
  }
}
