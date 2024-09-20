import { MOCK_POST_MESSAGE } from '@core/testing/mocks/post.mock';
import { ShortMessagePipe } from './short-message.pipe';

describe('ShortMessagePipe', () => {
  let pipe: ShortMessagePipe;

  beforeEach(() => {
    pipe = new ShortMessagePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the same message if {alone}', () => {
    const message = pipe.transform("test-message", true);
    expect(message).toBe("test-message");
  });

  it('should return a shorten message if {small} and {showIntro}', () => {
    const message = pipe.transform(MOCK_POST_MESSAGE, false, true, true);
    expect(message).toBe(MOCK_POST_MESSAGE.slice(0, 325) + '...');
  });

  it('should return a bigger message if {showIntro}', () => {
    const message = pipe.transform(MOCK_POST_MESSAGE, false, false, true);
    expect(message).toBe(MOCK_POST_MESSAGE.slice(0, 610) + '...');
  });

});
