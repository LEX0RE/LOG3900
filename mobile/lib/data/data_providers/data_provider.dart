import 'dart:convert';

import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:Scrabble/environments/environment.dart' as env;
import 'package:Scrabble/environments/environment.prod.dart' as prod_env;
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

part 'http_proxy.dart';

abstract class DataProvider {
  final IdentityHolder identityHolder;
  final HttpProxy httpProxy;
  final String baseUrl = (kReleaseMode) ? prod_env.Environnement.SERVER_URL : env.Environnement.SERVER_URL;

  DataProvider(this.identityHolder, this.httpProxy);

  Map<String, String> updateHeader(Map<String, String>? headers) {
    headers ??= {};

    headers['Authorization'] = 'Bearer ${identityHolder.identity.token}';
    headers['Content-Type'] = 'application/json';

    return headers;
  }

  Future<http.Response> get(String url, {Map<String, String>? headers}) async =>
      httpProxy.get(Uri.parse('$baseUrl/$url'), headers: updateHeader(headers));

  Future<http.Response> post<T>(String url, Serializable<T> body, {Map<String, String>? headers}) async {
    Map<String, dynamic> jsonBody = body.toJson();
    return httpProxy.post(Uri.parse('$baseUrl/$url'), body: jsonEncode(jsonBody), headers: updateHeader(headers));
  }

  Future<http.Response> put<T>(String url, Serializable<T> body, {Map<String, String>? headers}) async {
    Map<String, dynamic> jsonBody = body.toJson();

    return httpProxy.put(Uri.parse('$baseUrl/$url'), body: jsonEncode(jsonBody), headers: updateHeader(headers));
  }

  Future<http.Response> delete(String url, {Map<String, String>? headers}) async =>
      httpProxy.delete(Uri.parse('$baseUrl/$url'), headers: updateHeader(headers));

  Future<http.Response> patch<T>(String url, Serializable<T> body, {Map<String, String>? headers}) async {
    Map<String, dynamic> jsonBody = body.toJson();

    return httpProxy.patch(Uri.parse('$baseUrl/$url'), body: jsonEncode(jsonBody), headers: updateHeader(headers));
  }
}
