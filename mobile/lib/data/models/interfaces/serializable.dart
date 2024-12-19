import 'dart:convert';

import 'package:equatable/equatable.dart';

abstract class Serializable<T> with EquatableMixin {
  const Serializable();
  T fromJson(Map<String, dynamic> json);
  Map<String, dynamic> toJson();

  String encode() => jsonEncode(this.toJson());

  T decode(String json) => fromJson(jsonDecode(json));
}
