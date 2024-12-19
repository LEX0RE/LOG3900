import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';

class ScrabbleTableWidget extends StatelessWidget {
  final double width;
  final double height;
  final double borderWidth;
  final double headerHeight;
  final String title;
  final List<String> headers;
  final List<int> columnWidths;
  final double headerFontSize;
  final int nItems;
  final double scrollBarThickness;
  final Widget Function(int rowIndex, int columnIndex) itemBuilder;
  final ScrollController scrollController = ScrollController();

  ScrabbleTableWidget({
    super.key,
    required this.nItems,
    required this.itemBuilder,
    this.title = '',
    this.headers = const [],
    this.columnWidths = const [],
    this.headerFontSize = 30,
    this.width = 800,
    this.height = 700,
    this.headerHeight = 70,
    this.borderWidth = 4,
    this.scrollBarThickness = 15,
  });

  @override
  Widget build(BuildContext context) {
    final themeColors = Theme.of(context).extension<ColorExtension>()!;
    return Container(
      width: width,
      height: height + 2 * borderWidth,
      decoration: BoxDecoration(
        color: themeColors.tableColor,
        border: Border.all(color: themeColors.tableBorderColor!, width: borderWidth),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        children: [
          Container(
            height: headerHeight,
            width: width,
            decoration: BoxDecoration(
              color: themeColors.tableColor,
              border: Border(
                bottom: BorderSide(color: themeColors.tableBorderColor!, width: 1.5 * borderWidth),
              ),
            ),
            child: Center(
                child:
                    Text(title, style: TextStyle(color: themeColors.tableFontColor, fontSize: 1.5 * headerFontSize))),
          ),
          SizedBox(
            height: headerHeight,
            child: createHeaders(context),
          ),
          SizedBox(
            height: height - 2 * headerHeight,
            child: RawScrollbar(
              thickness: scrollBarThickness,
              thumbVisibility: true,
              thumbColor: themeColors.buttonBorderColor,
              trackVisibility: true,
              trackColor: themeColors.scrollBarBackgroundColor,
              trackRadius: const Radius.circular(10),
              radius: const Radius.circular(10),
              controller: scrollController,
              child: SingleChildScrollView(
                scrollDirection: Axis.vertical,
                controller: scrollController,
                child: Table(
                  defaultVerticalAlignment: TableCellVerticalAlignment.middle,
                  columnWidths:
                      columnWidths.asMap().map((key, value) => MapEntry(key, FlexColumnWidth(value.toDouble()))),
                  children: [
                    ...List.generate(
                      nItems,
                      (rowIndex) => TableRow(
                        children: List.generate(
                          headers.length,
                          (columnIndex) => Center(child: itemBuilder(rowIndex, columnIndex)),
                        ),
                      ),
                    )
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget createHeaders(BuildContext context) {
    final themeColors = Theme.of(context).extension<ColorExtension>()!;
    return Row(
      children: headers
          .map(
            (String header) => Flexible(
              flex: columnWidths[headers.indexOf(header)],
              child: Container(
                decoration: BoxDecoration(
                  color: themeColors.tableColor,
                  border: Border(
                    bottom: BorderSide(color: themeColors.tableBorderColor!, width: borderWidth),
                  ),
                ),
                child: Center(
                    child: Text(
                  header,
                  style: TextStyle(color: themeColors.tableFontColor, fontSize: headerFontSize),
                  textAlign: TextAlign.center,
                )),
              ),
            ),
          )
          .toList(),
    );
  }
}
