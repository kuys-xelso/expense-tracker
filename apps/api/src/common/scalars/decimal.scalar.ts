import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Decimal')
export class DecimalScalar implements CustomScalar<string | number, string> {
  description = 'Decimal custom scalar type';

  parseValue(value: unknown): string {
    if (typeof value === 'string' || typeof value === 'number') {
      return String(value);
    }
    throw new Error('Decimal can only parse string or number values');
  }

  serialize(value: unknown): string {
    if (value === null || value === undefined) {
      return '0';
    }
    if (typeof value === 'string' || typeof value === 'number') {
      return String(value);
    }
    if (typeof value === 'object' && value !== null && 'toString' in value) {
      return String((value as { toString: () => string }).toString());
    }
    throw new Error('Decimal cannot serialize value');
  }

  parseLiteral(ast: ValueNode): string {
    if (ast.kind === Kind.STRING || ast.kind === Kind.INT || ast.kind === Kind.FLOAT) {
      return ast.value;
    }
    throw new Error('Decimal can only parse string, int, or float values');
  }
}
