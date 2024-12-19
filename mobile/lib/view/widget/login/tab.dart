import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';

class TabWidget extends StatelessWidget {
  final bool isSelected;
  final Function() onTap;
  final String text;
  const TabWidget({
    required this.isSelected,
    required this.text,
    required this.onTap,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    ThemeData theme = Theme.of(context);
    ColorExtension themeColors = theme.extension<ColorExtension>()!;
    Radius radius = const Radius.circular(30);
    return Expanded(
      flex: 1,
      child: Stack(
        children: [
          this.isSelected
              ? Positioned(
                  child: Container(
                    margin: EdgeInsets.only(left: 5, right: 5, top: 60),
                    color: this.isSelected ? themeColors.buttonColor : themeColors.disabledTab,
                  ),
                )
              : Container(),
          GestureDetector(
            onTap: () {
              if (!isSelected) {
                onTap();
              }
            },
            child: Container(
              decoration: BoxDecoration(
                color: isSelected ? themeColors.buttonColor : themeColors.disabledTab,
                border: Border.all(
                  color: themeColors.buttonBorderColor!,
                  width: 5,
                ),
                borderRadius: BorderRadius.only(
                  topLeft: radius,
                  topRight: radius,
                ),
              ),
              child: Center(
                child: Text(
                  text,
                  style: theme.textTheme.titleMedium,
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}
