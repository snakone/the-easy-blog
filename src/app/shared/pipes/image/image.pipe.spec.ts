import { ImagePipe } from "./image.pipe";

describe('ImagePipe', () => {
  let pipe: ImagePipe;

  beforeEach(() => {
    pipe = new ImagePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy(); 
  });

  it('should tranform a image name into a path', () => {
    const fileName = 'test.jpg';
    const result = pipe.transform(fileName, null);
    expect(result).toBe("assets/images/" + fileName);
  });

  it('should tranform a image name into a path with extra folder', () => {
    const fileName = 'test.jpg';
    const result = pipe.transform(fileName, 'icons');
    expect(result).toBe("assets/images/icons/" + fileName);
  });

})