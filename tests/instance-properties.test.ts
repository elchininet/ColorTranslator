import { ColorTranslator } from '../src';
import { COLORS } from './tests.constants';

// Test class properties
COLORS.forEach((item): void => {

    const instance = new ColorTranslator(item.hex);

    describe(`Test properties of ${item.hex}`, (): void => {

        it('check R, G, B, and A properties', (): void => {

            const R = instance.R;
            const G = instance.G;
            const B = instance.B;
            const H = instance.H;
            const S = instance.S;
            const L = instance.L;
            const A = instance.A;
            const C = instance.C;
            const M = instance.M;
            const Y = instance.Y;
            const K = instance.K;

            // Test A
            instance.A = 0.5;
            expect(instance.A).toBe(0.5);
            instance.A = -1;
            expect(instance.A).toBe(0);
            instance.A = 2;
            expect(instance.A).toBe(1);
            instance.A = A;

            // Test R
            instance.R = 128;
            expect(instance.R).toBe(128);
            instance.R = -255;
            expect(instance.R).toBe(0);
            instance.R = 500;
            expect(instance.R).toBe(255);
            instance.R = R;

            // Test G
            instance.G = 128;
            expect(instance.G).toBe(128);
            instance.G = -255;
            expect(instance.G).toBe(0);
            instance.G = 500;
            expect(instance.G).toBe(255);
            instance.G = G;

            // Test B
            instance.B = 128;
            expect(instance.B).toBe(128);
            instance.B = -255;
            expect(instance.B).toBe(0);
            instance.B = 500;
            expect(instance.B).toBe(255);
            instance.B = B;

            // Test H
            instance.H = 128;
            expect(instance.H).toBe(128);
            instance.H = -128;
            expect(instance.H).toBe(232);
            instance.H = 488;
            expect(instance.H).toBe(128);
            instance.H = H;

            // Test S
            instance.S = 50;
            expect(instance.S).toBe(50);
            instance.S = -100;
            expect(instance.S).toBe(0);
            instance.S = 200;
            expect(instance.S).toBe(100);
            instance.S = S;

            // Test L
            instance.L = 50;
            expect(instance.L).toBe(50);
            instance.L = -100;
            expect(instance.L).toBe(0);
            instance.L = 200;
            expect(instance.L).toBe(100);
            instance.L = L;

            // Test C
            instance.C = 50;
            expect(instance.C).toBe(50);
            instance.C = -100;
            expect(instance.C).toBe(0);
            instance.C = 200;
            expect(instance.C).toBe(100);
            instance.C = C;

            // Test M
            instance.M = 50;
            expect(instance.M).toBe(50);
            instance.M = -100;
            expect(instance.M).toBe(0);
            instance.M = 200;
            expect(instance.M).toBe(100);
            instance.M = M;

            // Test Y
            instance.Y = 50;
            expect(instance.Y).toBe(50);
            instance.Y = -100;
            expect(instance.Y).toBe(0);
            instance.Y = 200;
            expect(instance.Y).toBe(100);
            instance.Y = Y;

            // Test K
            instance.K = 50;
            expect(instance.K).toBe(50);
            instance.K = -100;
            expect(instance.K).toBe(0);
            instance.K = 200;
            expect(instance.K).toBe(100);
            instance.K = K;
    
        });

    });

});