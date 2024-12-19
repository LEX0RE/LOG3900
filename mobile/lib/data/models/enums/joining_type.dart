enum JoiningType { OBSERVATION, PLAY }

String Function(JoiningType) joiningTypeToString = (JoiningType joiningType) {
  switch (joiningType) {
    case JoiningType.OBSERVATION:
      return 'observation';
    case JoiningType.PLAY:
      return 'play';
    default:
      return '';
  }
};

bool Function(String) isPlay = (String joiningType) {
  return joiningType == joiningTypeToString(JoiningType.PLAY);
};
