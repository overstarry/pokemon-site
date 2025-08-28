'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface AnimatedContainerProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale-in' | 'bounce-in';
  delay?: number;
  duration?: number;
  className?: string;
  trigger?: 'mount' | 'scroll' | 'hover';
  threshold?: number;
}

const animationClasses = {
  'fade-in': 'animate-fade-in',
  'slide-up': 'animate-slide-up',
  'slide-down': 'animate-slide-down',
  'slide-left': 'animate-slide-left',
  'slide-right': 'animate-slide-right',
  'scale-in': 'animate-scale-in',
  'bounce-in': 'animate-bounce-in',
};

export function AnimatedContainer({
  children,
  animation = 'fade-in',
  delay = 0,
  duration = 500,
  className,
  trigger = 'mount',
  threshold = 0.1,
}: AnimatedContainerProps) {
  const [isVisible, setIsVisible] = useState(trigger === 'mount');
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trigger === 'scroll' && ref.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
          }
        },
        { threshold }
      );

      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [trigger, threshold, hasAnimated]);

  useEffect(() => {
    if (trigger === 'mount' && delay > 0) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [trigger, delay]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsVisible(false);
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all',
        isVisible ? animationClasses[animation] : 'opacity-0',
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// 预设动画组件
export function FadeIn({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <AnimatedContainer animation="fade-in" delay={delay} className={className}>
      {children}
    </AnimatedContainer>
  );
}

export function SlideUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <AnimatedContainer animation="slide-up" delay={delay} className={className}>
      {children}
    </AnimatedContainer>
  );
}

export function ScaleIn({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <AnimatedContainer animation="scale-in" delay={delay} className={className}>
      {children}
    </AnimatedContainer>
  );
}

// 交错动画容器
export interface StaggeredContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  animation?: AnimatedContainerProps['animation'];
  className?: string;
}

export function StaggeredContainer({
  children,
  staggerDelay = 100,
  animation = 'slide-up',
  className,
}: StaggeredContainerProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className="animate-fade-in"
          style={{
            animationDelay: `${index * staggerDelay}ms`,
            animationFillMode: 'both'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
