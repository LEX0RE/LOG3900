import 'package:Scrabble/logic/authentication/authentication_manager/authentication_manager_bloc.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class RouterManagerWidget extends StatelessWidget {
  final Widget child;

  const RouterManagerWidget({
    Key? key,
    required this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) => BlocProvider(
        create: (context) => RouterManager(context, BlocProvider.of<AuthenticationManagerBloc>(context)),
        lazy: false,
        child: child,
      );
}
