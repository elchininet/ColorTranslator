import { COLORS, ColorProps, ColorTranslator } from './data/data';

// Test class properties
COLORS.forEach((item: ColorProps): void => {

    const instance = new ColorTranslator(item.rgbObject);

    describe(`Test properties of ${JSON.stringify(item.rgbObject)}`, (): void => {

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
            instance.setA(0.5);
            expect(instance.A).toBe(0.5);
            instance.setA(-1);
            expect(instance.A).toBe(0);
            instance.setA(2);
            expect(instance.A).toBe(1);
            instance.setA(A);

            // Test R
            instance.setR(128);
            expect(instance.R).toBe(128);
            instance.setR(-255);
            expect(instance.R).toBe(0);
            instance.setR(500);
            expect(instance.R).toBe(255);
            instance.setR(R);

            // Test G
            instance.setG(128);
            expect(instance.G).toBe(128);
            instance.setG(-255);
            expect(instance.G).toBe(0);
            instance.setG(500);
            expect(instance.G).toBe(255);
            instance.setG(G);

            // Test B
            instance.setB(128);
            expect(instance.B).toBe(128);
            instance.setB(-255);
            expect(instance.B).toBe(0);
            instance.setB(500);
            expect(instance.B).toBe(255);
            instance.setB(B);

            // Test H
            instance.setH(128);
            expect(instance.H).toBe(128);
            instance.setH(-128);
            expect(instance.H).toBe(232);
            instance.setH(488);
            expect(instance.H).toBe(128);
            instance.setH(H);

            // Test S
            instance.setS(50);
            expect(instance.S).toBe(50);
            instance.setS(-100);
            expect(instance.S).toBe(0);
            instance.setS(200);
            expect(instance.S).toBe(100);
            instance.setS(S);

            // Test L
            instance.setL(50);
            expect(instance.L).toBe(50);
            instance.setL(-100);
            expect(instance.L).toBe(0);
            instance.setL(200);
            expect(instance.L).toBe(100);
            instance.setS(L);

            // Test C
            instance.setC(50);
            expect(instance.C).toBe(50);
            instance.setC(-100);
            expect(instance.C).toBe(0);
            instance.setC(200);
            expect(instance.C).toBe(100);
            instance.setC(C);

            // Test M
            instance.setM(50);
            expect(instance.M).toBe(50);
            instance.setM(-100);
            expect(instance.M).toBe(0);
            instance.setM(200);
            expect(instance.M).toBe(100);
            instance.setM(M);

            // Test Y
            instance.setY(50);
            expect(instance.Y).toBe(50);
            instance.setY(-100);
            expect(instance.Y).toBe(0);
            instance.setY(200);
            expect(instance.Y).toBe(100);
            instance.setY(Y);

            // Test K
            instance.setK(50);
            expect(instance.K).toBe(50);
            instance.setK(-100);
            expect(instance.K).toBe(0);
            instance.setK(200);
            expect(instance.K).toBe(100);
            instance.setK(K);
    
        });

    });

});