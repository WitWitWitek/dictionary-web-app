import { MarkValue } from '@/types';

const assignMarkHandler = (mark: number): string => {
  switch (true) {
    case mark < 0.25:
      return MarkValue.Bad;
    case mark > 0.75:
      return MarkValue.Excellent;
    default:
      return MarkValue.Mediocrely;
  }
};

export default assignMarkHandler;
