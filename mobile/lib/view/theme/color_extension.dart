import 'package:flutter/material.dart';

@immutable
class ColorExtension extends ThemeExtension<ColorExtension> {
  const ColorExtension({
    required this.backgroundColor,
    required this.generalFontColor,
    required this.buttonColor,
    required this.buttonHoverColor,
    required this.buttonBorderColor,
    required this.buttonFontColor,
    required this.disabledButtonColor,
    required this.disabledButtonBorderColor,
    required this.disabledButtonFontColor,
    required this.disabledTab,
    required this.clearerButtonColor,
    required this.clearerButtonHoverColor,
    required this.overlayColor,
    required this.overlayBorderColor,
    required this.greyingScreenColor,
    required this.tileColor,
    required this.tileBorderColor,
    required this.tileFontColor,
    required this.defaultBoardColor,
    required this.boardBorderColor,
    required this.boardFontColor,
    required this.columnIdFontColor,
    required this.titleFontColor,
    required this.shadowColor,
    required this.tableColor,
    required this.tableBorderColor,
    required this.tableFontColor,
    required this.inputSectionColor,
    required this.messageUsernameFontColor,
    required this.chatColor,
    required this.separator,
    required this.tooltipColor,
    required this.tooltipBorderColor,
    required this.easelColor,
    required this.easelBorderColor,
    required this.gameItemInfoColor,
    required this.waitingDotColor,
    required this.scrollBarBackgroundColor,
  });

  final Color? scrollBarBackgroundColor;
  final Color? backgroundColor;
  final Color? generalFontColor;
  final Color? buttonColor;
  final Color? buttonHoverColor;
  final Color? buttonBorderColor;
  final Color? buttonFontColor;
  final Color? disabledButtonColor;
  final Color? disabledButtonBorderColor;
  final Color? disabledButtonFontColor;
  final Color? disabledTab;
  final Color? clearerButtonColor;
  final Color? clearerButtonHoverColor;
  final Color? overlayColor;
  final Color? overlayBorderColor;
  final Color? greyingScreenColor;
  final Color? tileColor;
  final Color? tileBorderColor;
  final Color? tileFontColor;
  final Color? defaultBoardColor;
  final Color? boardBorderColor;
  final Color? boardFontColor;
  final Color? columnIdFontColor;
  final Color? titleFontColor;
  final Color? shadowColor;
  final Color? tableColor;
  final Color? tableBorderColor;
  final Color? tableFontColor;
  final Color? inputSectionColor;
  final Color? messageUsernameFontColor;
  final Color? chatColor;
  final Color? separator;
  final Color? tooltipColor;
  final Color? tooltipBorderColor;
  final Color? easelColor;
  final Color? easelBorderColor;
  final Color? gameItemInfoColor;
  final Color? waitingDotColor;
  static Color? profileBackground = const Color.fromRGBO(238, 208, 140, 1);
  static Color? quitButtonColor = const Color.fromRGBO(186, 97, 77, 1);
  static Color? quitButtonHoverColor = const Color.fromRGBO(129, 76, 64, 1);
  static Color? quitButtonBorderColor = Colors.black;
  static Color? easyButtonColor = const Color.fromRGBO(59, 181, 57, 1);
  static Color? easyButtonSelectedColor = const Color.fromRGBO(67, 204, 64, 1);
  static Color? easyButtonBorderColor = const Color.fromRGBO(14, 140, 11, 1);
  static Color? hardButtonColor = const Color.fromRGBO(210, 86, 86, 1);
  static Color? hardButtonSelectedColor = const Color.fromRGBO(238, 97, 97, 1);
  static Color? hardButtonBorderColor = const Color.fromRGBO(168, 30, 30, 1);
  static Color? badButtonColor = const Color.fromRGBO(224, 0, 0, 1);
  static Color? badButtonHoverColor = const Color.fromRGBO(168, 18, 18, 1);
  static Color? playButtonColor = const Color.fromRGBO(63, 210, 88, 1);
  static Color? playButtonHoverColor = const Color.fromRGBO(58, 176, 78, 1);
  static Color? playButtonBorderColor = const Color.fromRGBO(51, 169, 71, 1);
  static Color? tileToManipulateBorder = const Color.fromRGBO(255, 0, 0, 1);
  static Color? tileToTradeBorder = const Color.fromRGBO(16, 176, 16, 1);
  static Color? errorColor = const Color.fromRGBO(255, 0, 0, 1);
  static Color? warningColor = const Color.fromRGBO(224, 0, 0, 1);
  static Color? clientMessageColor = const Color.fromRGBO(127, 212, 125, 1);
  static Color? systemMessageColor = Colors.black;
  static Color? otherMessageColor = const Color.fromRGBO(215, 163, 81, 1);
  static Color? messageFontColor = Colors.white;
  static Color? messageTimeFontColor = Colors.black;
  static Color? turnBorderColor = const Color.fromRGBO(37, 128, 37, 1);
  static Color? inputBackgroundColor = Colors.white;
  static Color? inputFontColor = Colors.black;
  static Color? inputPlaceholderColor = const Color.fromRGBO(168, 168, 168, 1);
  static Color? observerButton = const Color.fromRGBO(18, 139, 166, 1);
  static Color? disabledObserverButton = const Color.fromRGBO(131, 219, 238, 1);

  @override
  ThemeExtension<ColorExtension> copyWith({
    Color? backgroundColor,
    Color? generalFontColor,
    Color? buttonColor,
    Color? buttonHoverColor,
    Color? buttonBorderColor,
    Color? buttonFontColor,
    Color? disabledButtonColor,
    Color? disabledButtonBorderColor,
    Color? disabledButtonFontColor,
    Color? disabledTab,
    Color? clearerButtonColor,
    Color? clearerButtonHoverColor,
    Color? overlayColor,
    Color? overlayBorderColor,
    Color? greyingScreenColor,
    Color? tileColor,
    Color? tileBorderColor,
    Color? tileFontColor,
    Color? defaultBoardColor,
    Color? boardBorderColor,
    Color? boardFontColor,
    Color? columnIdFontColor,
    Color? titleFontColor,
    Color? shadowColor,
    Color? tableColor,
    Color? tableBorderColor,
    Color? tableFontColor,
    Color? inputSectionColor,
    Color? messageUsernameFontColor,
    Color? chatColor,
    Color? separator,
    Color? tooltipColor,
    Color? tooltipBorderColor,
    Color? easelColor,
    Color? easelBorderColor,
    Color? gameItemInfoColor,
    Color? waitingDotColor,
  }) =>
      ColorExtension(
        scrollBarBackgroundColor: scrollBarBackgroundColor,
        backgroundColor: this.backgroundColor,
        generalFontColor: this.generalFontColor,
        buttonColor: this.buttonColor,
        buttonHoverColor: this.buttonHoverColor,
        buttonBorderColor: this.buttonBorderColor,
        buttonFontColor: this.buttonFontColor,
        disabledButtonColor: this.disabledButtonColor,
        disabledButtonBorderColor: this.disabledButtonBorderColor,
        disabledButtonFontColor: this.disabledButtonFontColor,
        disabledTab: this.disabledTab,
        clearerButtonColor: this.clearerButtonColor,
        clearerButtonHoverColor: this.clearerButtonHoverColor,
        overlayColor: this.overlayColor,
        overlayBorderColor: this.overlayBorderColor,
        greyingScreenColor: this.greyingScreenColor,
        tileColor: this.tileColor,
        tileBorderColor: this.tileBorderColor,
        tileFontColor: this.tileFontColor,
        defaultBoardColor: this.defaultBoardColor,
        boardBorderColor: this.boardBorderColor,
        boardFontColor: this.boardFontColor,
        columnIdFontColor: this.columnIdFontColor,
        titleFontColor: this.titleFontColor,
        shadowColor: this.shadowColor,
        tableColor: this.tableColor,
        tableBorderColor: this.tableBorderColor,
        tableFontColor: this.tableFontColor,
        inputSectionColor: this.inputSectionColor,
        messageUsernameFontColor: this.messageUsernameFontColor,
        chatColor: this.chatColor,
        separator: this.separator,
        tooltipColor: this.tooltipColor,
        tooltipBorderColor: this.tooltipBorderColor,
        easelColor: this.easelColor,
        easelBorderColor: this.easelBorderColor,
        gameItemInfoColor: this.gameItemInfoColor,
        waitingDotColor: this.waitingDotColor,
      );

  @override
  ThemeExtension<ColorExtension> lerp(ThemeExtension<ColorExtension>? other, double t) {
    if (other is! ColorExtension) {
      return this;
    }

    return ColorExtension(
      scrollBarBackgroundColor: Color.lerp(scrollBarBackgroundColor, other.scrollBarBackgroundColor, t),
      backgroundColor: Color.lerp(backgroundColor, other.backgroundColor, t),
      generalFontColor: Color.lerp(generalFontColor, other.generalFontColor, t),
      buttonColor: Color.lerp(buttonColor, other.buttonColor, t),
      buttonHoverColor: Color.lerp(buttonHoverColor, other.buttonHoverColor, t),
      buttonBorderColor: Color.lerp(buttonBorderColor, other.buttonBorderColor, t),
      buttonFontColor: Color.lerp(buttonFontColor, other.buttonFontColor, t),
      disabledButtonColor: Color.lerp(disabledButtonColor, other.disabledButtonColor, t),
      disabledButtonBorderColor: Color.lerp(disabledButtonBorderColor, other.disabledButtonBorderColor, t),
      disabledButtonFontColor: Color.lerp(disabledButtonFontColor, other.disabledButtonFontColor, t),
      disabledTab: Color.lerp(disabledTab, other.disabledTab, t),
      clearerButtonColor: Color.lerp(clearerButtonColor, other.clearerButtonColor, t),
      clearerButtonHoverColor: Color.lerp(clearerButtonHoverColor, other.clearerButtonHoverColor, t),
      overlayColor: Color.lerp(overlayColor, other.overlayColor, t),
      overlayBorderColor: Color.lerp(overlayBorderColor, other.overlayBorderColor, t),
      greyingScreenColor: Color.lerp(greyingScreenColor, other.greyingScreenColor, t),
      tileColor: Color.lerp(tileColor, other.tileColor, t),
      tileBorderColor: Color.lerp(tileBorderColor, other.tileBorderColor, t),
      tileFontColor: Color.lerp(tileFontColor, other.tileFontColor, t),
      defaultBoardColor: Color.lerp(defaultBoardColor, other.defaultBoardColor, t),
      boardBorderColor: Color.lerp(boardBorderColor, other.boardBorderColor, t),
      boardFontColor: Color.lerp(boardFontColor, other.boardFontColor, t),
      columnIdFontColor: Color.lerp(columnIdFontColor, other.columnIdFontColor, t),
      titleFontColor: Color.lerp(titleFontColor, other.titleFontColor, t),
      shadowColor: Color.lerp(shadowColor, other.shadowColor, t),
      tableColor: Color.lerp(tableColor, other.tableColor, t),
      tableBorderColor: Color.lerp(tableBorderColor, other.tableBorderColor, t),
      tableFontColor: Color.lerp(tableFontColor, other.tableFontColor, t),
      inputSectionColor: Color.lerp(inputSectionColor, other.inputSectionColor, t),
      messageUsernameFontColor: Color.lerp(messageUsernameFontColor, other.messageUsernameFontColor, t),
      chatColor: Color.lerp(chatColor, other.chatColor, t),
      separator: Color.lerp(separator, other.separator, t),
      tooltipColor: Color.lerp(tooltipColor, other.tooltipColor, t),
      tooltipBorderColor: Color.lerp(tooltipBorderColor, other.tooltipBorderColor, t),
      easelColor: Color.lerp(easelColor, other.easelColor, t),
      easelBorderColor: Color.lerp(easelBorderColor, other.easelBorderColor, t),
      gameItemInfoColor: Color.lerp(gameItemInfoColor, other.gameItemInfoColor, t),
      waitingDotColor: Color.lerp(waitingDotColor, other.waitingDotColor, t),
    );
  }

  static const defaultExtension = ColorExtension(
    scrollBarBackgroundColor: Color.fromRGBO(240, 234, 221, 1),
    backgroundColor: Color.fromRGBO(227, 218, 197, 1),
    generalFontColor: Colors.black,
    buttonColor: Color.fromRGBO(186, 143, 77, 1),
    buttonHoverColor: Color.fromRGBO(135, 109, 68, 1),
    buttonBorderColor: Color.fromRGBO(150, 103, 32, 1),
    buttonFontColor: Colors.white,
    disabledButtonColor: Color.fromRGBO(204, 204, 204, 1),
    disabledButtonBorderColor: Color.fromRGBO(182, 178, 178, 1),
    disabledButtonFontColor: Color.fromRGBO(148, 147, 147, 1),
    disabledTab: Color.fromRGBO(137, 112, 71, 1),
    clearerButtonColor: Color.fromRGBO(202, 167, 114, 1),
    clearerButtonHoverColor: Color.fromRGBO(165, 137, 92, 1),
    overlayColor: Color.fromRGBO(219, 204, 168, 1),
    overlayBorderColor: Colors.black,
    greyingScreenColor: Color.fromRGBO(0, 0, 0, 0.5), // Noir transparent
    tileColor: Color.fromRGBO(115, 74, 13, 1),
    tileBorderColor: Colors.black,
    tileFontColor: Color.fromRGBO(255, 251, 245, 1),
    defaultBoardColor: Color.fromRGBO(186, 143, 77, 1),
    boardBorderColor: Color.fromRGBO(150, 103, 32, 1),
    boardFontColor: Colors.white,
    columnIdFontColor: Colors.black,
    titleFontColor: Color.fromRGBO(107, 54, 4, 1),
    shadowColor: Colors.black,
    tableColor: Color.fromRGBO(186, 143, 77, 1),
    tableBorderColor: Color.fromRGBO(150, 103, 32, 1),
    tableFontColor: Colors.white,
    inputSectionColor: Color.fromRGBO(120, 93, 54, 1),
    messageUsernameFontColor: Colors.black,
    chatColor: Color.fromRGBO(68, 68, 68, 1),
    separator: Color.fromRGBO(78, 56, 24, 1),
    tooltipColor: Color.fromRGBO(202, 167, 114, 1),
    tooltipBorderColor: Color.fromRGBO(158, 125, 76, 1),
    easelColor: Color.fromRGBO(158, 125, 76, 1),
    easelBorderColor: Colors.black,
    gameItemInfoColor: Colors.black,
    waitingDotColor: Color.fromRGBO(115, 74, 13, 1),
  );

  static const darkExtension = ColorExtension(
    scrollBarBackgroundColor: Color.fromRGBO(240, 234, 221, 1),
    backgroundColor: Color.fromRGBO(50, 51, 51, 1),
    generalFontColor: Color.fromRGBO(147, 147, 147, 1),
    buttonColor: Color.fromRGBO(104, 104, 104, 1),
    buttonHoverColor: Color.fromRGBO(168, 166, 166, 1),
    buttonBorderColor: Color.fromRGBO(147, 147, 147, 1),
    buttonFontColor: Colors.white,
    disabledButtonColor: Color.fromRGBO(104, 104, 104, 1),
    disabledButtonBorderColor: Color.fromRGBO(104, 104, 104, 1),
    disabledButtonFontColor: Color.fromRGBO(148, 147, 147, 1),
    disabledTab: Color.fromRGBO(80, 80, 80, 1),
    clearerButtonColor: Color.fromRGBO(104, 104, 104, 1),
    clearerButtonHoverColor: Color.fromRGBO(168, 166, 166, 1),
    overlayColor: Color.fromRGBO(86, 86, 86, 1),
    overlayBorderColor: Color.fromRGBO(147, 147, 147, 1),
    greyingScreenColor: Color.fromRGBO(255, 255, 255, 0.5), // Blanc transparent
    tileColor: Color.fromRGBO(170, 170, 170, 1),
    tileBorderColor: Colors.white,
    tileFontColor: Colors.black,
    defaultBoardColor: Color.fromRGBO(215, 210, 210, 1),
    boardBorderColor: Color.fromRGBO(147, 147, 147, 1),
    boardFontColor: Colors.white,
    columnIdFontColor: Color.fromRGBO(147, 147, 147, 1),
    titleFontColor: Color.fromRGBO(221, 221, 221, 1),
    shadowColor: Colors.black,
    tableColor: Color.fromRGBO(104, 104, 104, 1),
    tableBorderColor: Color.fromRGBO(147, 147, 147, 1),
    tableFontColor: Colors.white,
    inputSectionColor: Color.fromRGBO(147, 147, 147, 1),
    messageUsernameFontColor: Color.fromRGBO(147, 147, 147, 1),
    chatColor: Color.fromRGBO(96, 96, 96, 1),
    separator: Colors.white,
    tooltipColor: Color.fromRGBO(168, 166, 166, 1),
    tooltipBorderColor: Color.fromRGBO(104, 104, 104, 1),
    easelColor: Color.fromRGBO(104, 104, 104, 1),
    easelBorderColor: Color.fromRGBO(147, 147, 147, 1),
    gameItemInfoColor: Colors.black,
    waitingDotColor: Color.fromRGBO(221, 221, 221, 1),
  );

  static const underTheSeaExtension = ColorExtension(
    scrollBarBackgroundColor: Color.fromRGBO(211, 236, 236, 1),
    backgroundColor: Color.fromRGBO(221, 237, 234, 1),
    generalFontColor: Color.fromRGBO(84, 112, 120, 1),
    buttonColor: Color.fromRGBO(143, 174, 169, 1),
    buttonHoverColor: Color.fromRGBO(161, 195, 189, 1),
    buttonBorderColor: Color.fromRGBO(84, 112, 120, 1),
    buttonFontColor: Colors.black,
    disabledButtonColor: Color.fromRGBO(143, 174, 169, 1),
    disabledButtonBorderColor: Color.fromRGBO(143, 174, 169, 1),
    disabledButtonFontColor: Color.fromRGBO(130, 130, 130, 1),
    disabledTab: Color.fromRGBO(116, 136, 133, 1),
    clearerButtonColor: Color.fromRGBO(143, 174, 169, 1),
    clearerButtonHoverColor: Color.fromRGBO(161, 195, 189, 1),
    overlayColor: Color.fromRGBO(221, 237, 234, 1),
    overlayBorderColor: Color.fromRGBO(84, 112, 120, 1),
    greyingScreenColor: Color.fromRGBO(0, 0, 0, 0.5), // Noir transparent
    tileColor: Color.fromRGBO(91, 133, 125, 1),
    tileBorderColor: Color.fromRGBO(143, 174, 169, 1),
    tileFontColor: Colors.white,
    defaultBoardColor: Color.fromRGBO(186, 223, 221, 1),
    boardBorderColor: Colors.white,
    boardFontColor: Colors.white,
    columnIdFontColor: Color.fromRGBO(91, 133, 125, 1),
    titleFontColor: Color.fromRGBO(76, 113, 106, 1),
    shadowColor: Colors.white,
    tableColor: Color.fromRGBO(143, 174, 169, 1),
    tableBorderColor: Color.fromRGBO(84, 112, 120, 1),
    tableFontColor: Colors.white,
    inputSectionColor: Color.fromRGBO(84, 112, 120, 1),
    messageUsernameFontColor: Color.fromRGBO(84, 112, 120, 1),
    chatColor: Color.fromRGBO(186, 223, 221, 1),
    separator: Colors.white,
    tooltipColor: Color.fromRGBO(161, 195, 189, 1),
    tooltipBorderColor: Color.fromRGBO(143, 174, 169, 1),
    easelColor: Colors.white,
    easelBorderColor: Color.fromRGBO(225, 224, 224, 1),
    gameItemInfoColor: Colors.white,
    waitingDotColor: Color.fromRGBO(186, 223, 221, 1),
  );
}
