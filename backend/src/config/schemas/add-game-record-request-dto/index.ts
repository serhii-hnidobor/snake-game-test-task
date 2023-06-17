const addGameRecordRequestDtoSchema = {
  type: 'object',
  properties: {
    score: { type: 'number' },
    player_name: { type: 'string' },
  },
  //required: ['score', 'player_name'],
  additionalProperties: false,
};

export { addGameRecordRequestDtoSchema as default };
