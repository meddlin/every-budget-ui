import {expect, jest, test} from '@jest/globals';
import { round } from '../../src/utility/calculators';

test('round - basic values', () => {
    const start = 1.1115;
    const rounded = round(start, 2);

    expect(rounded).toBe(1.11)
});

test('round - Edge case: 2.0100000000000002', () => {
    const start = 2.0100000000000002;
    const rounded = round(start, 2);

    expect(rounded).toBe(2.01);
});
test('round - Edge case: sum to 2.01', () => {
    const sum = 0.51 + 0.2 + 0.37 + 0.37 + 0.56
    const rounded = round(sum, 2);

    expect(rounded).toBe(2.01)
});

test('round - Edge case: 3.8100000000000005', () => {
    const start = 3.8100000000000005;
    const rounded = round(start, 2);

    expect(rounded).toBe(3.81);
});
test('round - Edge case: sum to 3.81', () => {
    const sum = 0.72 + 0.78 + 0.62 + 0.7 + 0.99;
    const rounded = round(sum, 2);

    expect(rounded).toBe(3.81);
});


test('round - Edge case: 95.345', () => {
    const start = 95.345;
    const rnd = round(start, 2);
    expect(rnd).toBe(95.35)
})

/**
 * Write these tests later.
 */
// roundOf(95.344, 2); // 95.34
// roundOf(5.0364342423, 2); // 5.04
// roundOf(0.595, 2); // 0.60
// roundOf(0.335, 2); // 0.34
// roundOf(0.345, 2); // 0.35
// roundOf(551.175, 2); // 551.18
// roundOf(0.3445434, 2); // 0.34