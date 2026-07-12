import { useCallback, useEffect, useReducer } from 'react';

type SliderDirection = 1 | -1;

interface UseSliderOptions {
  /** Total number of slides */
  count: number;
  /** Starting index (default: 0) */
  initialIndex?: number;
  /** Wrap past first/last slide (default: true) */
  loop?: boolean;
  /** Called when index changes */
  onChange?: (index: number) => void;
}

interface UseSliderResult {
  index: number;
  direction: SliderDirection;
  isTransitioning: boolean;
  next: () => void;
  prev: () => void;
  goTo: (targetIndex: number) => void;
  onTransitionSettled: () => void;
  isFirst: boolean;
  isLast: boolean;
}

interface State {
  index: number;
  direction: SliderDirection;
  isTransitioning: boolean;
}

type Action =
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'GOTO'; target: number }
  | { type: 'SETTLE' };

function reducer(
  state: State,
  action: Action,
  options: UseSliderOptions,
): State {
  switch (action.type) {
    case 'NEXT': {
      const nextIndex = state.index + 1;
      return {
        index: options.loop
          ? nextIndex % options.count
          : Math.min(nextIndex, options.count - 1),
        direction: 1,
        isTransitioning: true,
      };
    }
    case 'PREV': {
      const prevIndex = state.index - 1;
      return {
        index: options.loop
          ? (prevIndex + options.count) % options.count
          : Math.max(prevIndex, 0),
        direction: -1,
        isTransitioning: true,
      };
    }
    case 'GOTO': {
      if (action.target === state.index) return state;
      return {
        index: action.target,
        direction: action.target > state.index ? 1 : -1,
        isTransitioning: true,
      };
    }
    case 'SETTLE': {
      return { ...state, isTransitioning: false };
    }
    default:
      return state;
  }
}

export function useSlider(options: UseSliderOptions): UseSliderResult {
  const { count, initialIndex = 0, loop = true, onChange } = options;

  const [state, dispatch] = useReducer(
    (prevState, action) => reducer(prevState, action, { count, loop }),
    {
      index: initialIndex,
      direction: 1 as SliderDirection,
      isTransitioning: false,
    },
  );

  const next = useCallback(() => {
    if (!state.isTransitioning) dispatch({ type: 'NEXT' });
  }, [state.isTransitioning]);

  const prev = useCallback(() => {
    if (!state.isTransitioning) dispatch({ type: 'PREV' });
  }, [state.isTransitioning]);

  const goTo = useCallback(
    (targetIndex: number) => {
      if (!state.isTransitioning && targetIndex >= 0 && targetIndex < count) {
        dispatch({ type: 'GOTO', target: targetIndex });
      }
    },
    [state.isTransitioning, count],
  );

  const onTransitionSettled = useCallback(() => {
    dispatch({ type: 'SETTLE' });
  }, []);

  useEffect(() => {
    onChange?.(state.index);
  }, [state.index, onChange]);

  return {
    index: state.index,
    direction: state.direction,
    isTransitioning: state.isTransitioning,
    next,
    prev,
    goTo,
    onTransitionSettled,
    isFirst: state.index === 0,
    isLast: state.index === count - 1,
  };
}
