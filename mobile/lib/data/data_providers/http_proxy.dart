part of 'data_provider.dart';

class HttpProxy {
  const HttpProxy();

  Future<http.Response> get(Uri url, {Map<String, String>? headers}) => http.get(url, headers: headers);

  Future<http.Response> post(
    Uri url, {
    Map<String, String>? headers,
    Object? body,
    Encoding? encoding,
  }) =>
      http.post(url, headers: headers, body: body, encoding: encoding);

  Future<http.Response> put(
    Uri url, {
    Map<String, String>? headers,
    Object? body,
    Encoding? encoding,
  }) =>
      http.put(url, headers: headers, body: body, encoding: encoding);

  Future<http.Response> delete(Uri url, {Map<String, String>? headers}) => http.delete(url, headers: headers);

  Future<http.Response> patch(
    Uri url, {
    Map<String, String>? headers,
    Object? body,
    Encoding? encoding,
  }) =>
      http.patch(url, headers: headers, body: body, encoding: encoding);
}
