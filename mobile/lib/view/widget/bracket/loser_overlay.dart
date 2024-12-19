import 'package:flutter/material.dart';

class LoserOverlay extends StatelessWidget {
  const LoserOverlay({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: CustomPaint(
        painter: MyPainter(),
      ),
    );
  }
}

class MyPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    const p1 = Offset(70, 15);
    const p2 = Offset(170, 55);
    const p3 = Offset(170, 15);
    const p4 = Offset(70, 55);
    final paint = Paint()
      ..color = Colors.red
      ..strokeWidth = 4;
    canvas.drawLine(p1, p2, paint);
    canvas.drawLine(p3, p4, paint);
  }

  @override
  bool shouldRepaint(CustomPainter old) {
    return false;
  }
}
