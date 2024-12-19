enum BracketResult {
  NO_RESULT,
  LOSER,
  WINNER,
}

int Function(BracketResult) bracketResultToInt = (BracketResult result) {
  switch (result) {
    case BracketResult.LOSER:
      return 0;
    case BracketResult.WINNER:
      return 1;
    case BracketResult.NO_RESULT:
    default:
      return -1;
  }
};
