bool isNullEmptyOrFalse(dynamic o) {
  if (o is Map<dynamic, dynamic> || o is List<dynamic>) {
    return o == null || o.length == 0;
  }
  return o == null || false == o || '' == o;
}
