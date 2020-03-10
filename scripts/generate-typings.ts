import { GraphQLDefinitionsFactory } from '@nestjs/graphql';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: [__dirname + '/../src/modules/**/graphql/*.graphql'],
  path: __dirname + '/../src/types/graphql.ts',
  outputAs: 'class',
  watch: true,
});