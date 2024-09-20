import { DraftStatusEnum } from '@shared/types/types.enums';
import { DraftStatusPipe } from './draft-status.pipe';

fdescribe('DraftStatusPipe', () => {
  let pipe: DraftStatusPipe;

  beforeEach(() => {
    pipe = new DraftStatusPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform the Post status into string "Pendiente"', () => {
    const status = DraftStatusEnum.PENDING;
    const result = pipe.transform(status);
    expect(result).toBe("Pendiente");
  });

  it('should transform the Post status into string "Aprobado"', () => {
    const status = DraftStatusEnum.APPROVED;
    const result = pipe.transform(status);
    expect(result).toBe("Aprobado");
  });

  it('should return "No visto" if no status', () => {
    const result = pipe.transform(undefined);
    expect(result).toBe("No visto");
  });

});
