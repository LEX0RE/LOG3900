import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';

class ScrabbleEditField extends StatelessWidget {
  final String label;
  final String value;
  final double? width;
  final double? height;
  late final TextEditingController controller;
  late final FocusNode focusNode;
  final String? Function(String?)? validator;
  final dynamic Function(String?) onSaved;

  // ignore: prefer_const_constructors_in_immutables
  ScrabbleEditField({
    super.key,
    required this.label,
    required this.value,
    required this.validator,
    required this.onSaved,
    this.width,
    this.height,
    TextEditingController? controller,
    FocusNode? focusNode,
  }) {
    this.controller = controller ?? TextEditingController(text: value);
    this.focusNode = focusNode ?? FocusNode();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final ColorExtension colorExtension = theme.extension<ColorExtension>()!;
    return Form(
      autovalidateMode: AutovalidateMode.onUserInteraction,
      child: SizedBox(
        width: width,
        height: height,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              flex: 2,
              child: Text(
                textAlign: TextAlign.right,
                label,
                style: theme.textTheme.headlineSmall,
              ),
            ),
            Flexible(
              flex: 2,
              child: TextFormField(
                controller: controller,
                focusNode: focusNode,
                validator: validator,
                onFieldSubmitted: (newValue) => onSaved(newValue),
                style: TextStyle(color: ColorExtension.inputFontColor),
                decoration: InputDecoration(
                  hintText: value,
                  contentPadding: const EdgeInsets.all(10),
                  focusedBorder: OutlineInputBorder(
                    borderSide: BorderSide(
                      color: colorExtension.buttonBorderColor!,
                      width: 2,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
