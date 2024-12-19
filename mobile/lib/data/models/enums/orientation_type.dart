enum OrientationType {
  Horizontal,
  Vertical,
  None,
}

String Function(OrientationType) orientationTypeToString = (OrientationType type) {
  switch (type) {
    case OrientationType.Horizontal:
      return 'h';
    case OrientationType.Vertical:
      return 'v';
    default:
      return '';
  }
};

OrientationType Function(String) stringToOrientationType = (String type) {
  if (RegExp('v').hasMatch(type)) return OrientationType.Vertical;
  if (RegExp('h').hasMatch(type)) return OrientationType.Horizontal;
  return OrientationType.None;
};
