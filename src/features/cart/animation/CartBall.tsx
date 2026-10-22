import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { colors, motion } from '../../../app/theme/tokens';

export interface BallPoint {
  x: number;
  y: number;
}

interface Ball {
  id: number;
  from: BallPoint;
  to: BallPoint;
}

interface CartBallApi {
  drop: (source: BallPoint) => void;
  registerTarget: (node: View | null) => void;
}

const CartBallContext = createContext<CartBallApi | null>(null);

export function useCartBall(): CartBallApi | null {
  return useContext(CartBallContext);
}

export function CartBallProvider({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<View>(null);
  const targetRef = useRef<View | null>(null);
  const nextId = useRef(0);
  const [balls, setBalls] = useState<Ball[]>([]);

  const registerTarget = useCallback((node: View | null) => {
    targetRef.current = node;
  }, []);

  const finish = useCallback((id: number) => {
    setBalls(prev => prev.filter(ball => ball.id !== id));
  }, []);

  const drop = useCallback((source: BallPoint) => {
    const overlay = overlayRef.current;
    const target = targetRef.current;
    if (!overlay || !target) {
      return;
    }
    overlay.measureInWindow((overlayX, overlayY) => {
      target.measureInWindow((targetX, targetY, targetWidth, targetHeight) => {
        const next: Ball = {
          id: nextId.current++,
          from: { x: source.x - overlayX, y: source.y - overlayY },
          to: {
            x: targetX + targetWidth / 2 - overlayX,
            y: targetY + targetHeight / 2 - overlayY,
          },
        };
        setBalls(prev => [...prev, next]);
      });
    });
  }, []);

  const api = useMemo<CartBallApi>(() => ({ drop, registerTarget }), [drop, registerTarget]);

  return (
    <CartBallContext.Provider value={api}>
      <View style={styles.root}>
        {children}
        <View ref={overlayRef} pointerEvents="none" style={StyleSheet.absoluteFill}>
          {balls.map(ball => (
            <FlyBall key={ball.id} ball={ball} onFinished={finish} />
          ))}
        </View>
      </View>
    </CartBallContext.Provider>
  );
}

function FlyBall({ ball, onFinished }: { ball: Ball; onFinished: (id: number) => void }) {
  const progressX = useRef(new Animated.Value(0)).current;
  const progressY = useRef(new Animated.Value(0)).current;
  const { from, to, id } = ball;
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  useEffect(() => {
    const moveX = Animated.timing(progressX, {
      toValue: 1,
      duration: motion.ball.duration,
      easing: Easing.linear,
      useNativeDriver: true,
    });
    const moveY = Animated.timing(progressY, {
      toValue: 1,
      duration: motion.ball.duration,
      easing: Easing.bezier(...motion.ball.ease),
      useNativeDriver: true,
    });

    const animation = Animated.parallel([moveX, moveY]);
    animation.start(({ finished }) => {
      if (finished) {
        onFinished(id);
      }
    });

    return () => {
      moveX.stop();
      moveY.stop();
    };
  }, [id, onFinished, progressX, progressY]);

  return (
    <Animated.View
      style={[
        styles.ball,
        { left: from.x - motion.ball.size / 2, top: from.y - motion.ball.size / 2 },
        {
          transform: [
            {
              translateX: progressX.interpolate({
                inputRange: [0, 1],
                outputRange: [0, dx],
              }),
            },
            {
              translateY: progressY.interpolate({
                inputRange: [0, 1],
                outputRange: [0, dy],
              }),
            },
          ],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  ball: {
    position: 'absolute',
    width: motion.ball.size,
    height: motion.ball.size,
    borderRadius: motion.ball.size / 2,
    backgroundColor: colors.blue,
  },
});
