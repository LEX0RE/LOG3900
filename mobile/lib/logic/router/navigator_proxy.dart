part of 'router_manager.dart';

class NavigatorProxy {
  const NavigatorProxy();

  Future<T?> pushNamedAndRemoveUntil<T extends Object?>(
    BuildContext context,
    String newRouteName,
    bool Function(Route<dynamic>) predicate, {
    Object? arguments,
  }) =>
      Navigator.pushNamedAndRemoveUntil<T>(context, newRouteName, predicate, arguments: arguments);
}
