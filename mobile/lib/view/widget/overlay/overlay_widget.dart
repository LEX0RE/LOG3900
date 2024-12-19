import 'package:Scrabble/logic/authentication/authentication_manager/authentication_manager_bloc.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class OverlayWidget<BLOC_TYPE extends StateStreamable<BASE_STATE>, STATE extends BASE_STATE, BASE_STATE>
    extends StatefulWidget {
  final Widget child;
  final EdgeInsets margin;
  final Function? onOverlayShown;
  final Function? onOverlayCancel;
  final Function? show;
  final bool removeExternalTap;

  const OverlayWidget({
    Key? key,
    required this.margin,
    required this.child,
    this.onOverlayShown,
    this.onOverlayCancel,
    this.show,
    this.removeExternalTap = true,
  }) : super(key: key);

  @override
  OverlayWidgetState<BLOC_TYPE, STATE, BASE_STATE> createState() => OverlayWidgetState<BLOC_TYPE, STATE, BASE_STATE>(
        child: child,
        margin: margin,
        onOverlayShown: onOverlayShown,
        onOverlayCancel: onOverlayCancel,
        show: show,
        removeExternalTap: removeExternalTap,
      );
}

class OverlayWidgetState<BLOC_TYPE extends StateStreamable<BASE_STATE>, STATE extends BASE_STATE, BASE_STATE>
    extends State<OverlayWidget<BLOC_TYPE, STATE, BASE_STATE>> {
  final Widget child;
  final EdgeInsets margin;
  final Function? onOverlayShown;
  final Function? onOverlayCancel;
  final Function? show;
  final bool removeExternalTap;
  bool firstTime = true;
  OverlayEntry? _overlayEntry;

  OverlayWidgetState({
    required this.child,
    required this.margin,
    required this.onOverlayShown,
    required this.onOverlayCancel,
    required this.show,
    required this.removeExternalTap,
  });

  @override
  Widget build(BuildContext context) {
    final BASE_STATE state = context.watch<BLOC_TYPE>().state;

    if (state is STATE && firstTime) {
      WidgetsBinding.instance.addPostFrameCallback((_) => _insertOverlay(context));
      firstTime = false;
    }

    return MultiBlocListener(
      listeners: [
        BlocListener<BLOC_TYPE, BASE_STATE>(
          listenWhen: (previous, current) => current.runtimeType != previous.runtimeType,
          listener: (BuildContext listenerContext, BASE_STATE state) {
            if (state is STATE) {
              _insertOverlay(context);
            } else {
              this.removeOverlay();
            }
          },
        ),
        BlocListener<AuthenticationManagerBloc, AuthenticationManagerState>(
          listener: (context, state) {
            if (state is AuthenticationManagerStateLoggedOut) this.removeOverlay();
          },
        ),
      ],
      child: const SizedBox.shrink(),
    );
  }

  bool get isOverlayShown => _overlayEntry != null;

  void removeOverlay() {
    _overlayEntry?.remove();
    _overlayEntry = null;
  }

  Widget _dismissibleOverlay(BuildContext context) => Scaffold(
        resizeToAvoidBottomInset: false,
        backgroundColor: Colors.transparent,
        body: Stack(
          fit: StackFit.expand,
          children: [
            Positioned.fill(
              child: ColoredBox(
                color: Theme.of(context).extension<ColorExtension>()!.greyingScreenColor!,
                child: GestureDetector(
                  onTap: () {
                    if (this.removeExternalTap) removeOverlay();
                    onOverlayCancel?.call();
                  },
                ),
              ),
            ),
            Container(
                padding: const EdgeInsets.all(20),
                margin: this.margin,
                decoration: BoxDecoration(
                  color: Theme.of(context).extension<ColorExtension>()!.backgroundColor,
                  border: Border.all(color: Theme.of(context).extension<ColorExtension>()!.tableBorderColor!, width: 5),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Center(child: this.child)),
          ],
        ),
      );

  void _insertOverlay(BuildContext context) {
    if (!this.isOverlayShown) {
      _overlayEntry = OverlayEntry(
        builder: (_) => _dismissibleOverlay(context),
      );

      Overlay.of(context).insert(_overlayEntry!);
      onOverlayShown?.call();
    }
  }

  @override
  void dispose() {
    removeOverlay();
    super.dispose();
  }
}
