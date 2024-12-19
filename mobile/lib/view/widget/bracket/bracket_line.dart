import 'package:flutter/material.dart';

class BracketLine extends StatelessWidget {
  final bool reverse;

  const BracketLine(this.reverse, {super.key});

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      size: const Size(100, 200),
      painter: MyPainter(reverse),
    );
  }
}

class MyPainter extends CustomPainter {
  final bool reverse;

  MyPainter(this.reverse);

  @override
  void paint(Canvas canvas, Size size) {
    final firstChild = (size.height * 1 / 4);
    final lastChild = (size.height * 3 / 4);
    final halfWidth = size.width / 2;
    final maxWidth = size.width;
    final halfHeight = size.height / 2;

    final paint = Paint()
      ..color = Colors.black
      ..strokeWidth = 4;

    final p1 = Offset(halfWidth, firstChild);
    final p2 = Offset(halfWidth, lastChild);
    canvas.drawLine(p1, p2, paint);

    final p3 = Offset(reverse ? maxWidth : 0, firstChild);
    final p4 = Offset(reverse ? maxWidth : 0, lastChild);
    canvas.drawLine(p1, p3, paint);
    canvas.drawLine(p2, p4, paint);

    final p5 = Offset(halfWidth, halfHeight);
    final p6 = Offset(reverse ? 0 : maxWidth, halfHeight);
    canvas.drawLine(p5, p6, paint);
  }

  @override
  bool shouldRepaint(CustomPainter old) {
    return false;
  }
}
