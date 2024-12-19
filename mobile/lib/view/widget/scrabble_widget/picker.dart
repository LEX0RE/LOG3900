import 'package:Scrabble/data/models/enums/scrabble_enum.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class ScrabblePicker<ENUM_TYPE extends ScrabbleEnum<RAW_ENUM_TYPE>, RAW_ENUM_TYPE extends Enum>
    extends StatelessWidget {
  final String Function(AppLocalizations) title;
  final String Function(AppLocalizations)? hintText;
  final ENUM_TYPE defaultValue;
  final dynamic Function(BuildContext, RAW_ENUM_TYPE) onChange;

  // ignore: prefer_const_constructors_in_immutables
  ScrabblePicker({
    required this.title,
    required this.defaultValue,
    required this.onChange,
    super.key,
    this.hintText,
  });

  @override
  Widget build(BuildContext context) {
    AppLocalizations localization = AppLocalizations.of(context);
    ThemeData theme = Theme.of(context);
    final Map<ScrabbleEnum<RAW_ENUM_TYPE>, String> names = defaultValue.mapInternationalNames(localization);

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Expanded(
          flex: 2,
          child: Text(
            textAlign: TextAlign.right,
            title(localization),
            style: theme.textTheme.headlineSmall,
          ),
        ),
        const SizedBox(width: 20),
        Flexible(
          flex: 4,
          child: DropdownButtonFormField(
            decoration: InputDecoration(
              contentPadding: const EdgeInsets.all(10),
              border: const OutlineInputBorder(),
              hintText: hintText != null ? hintText!(localization) : null,
              fillColor: ColorExtension.inputBackgroundColor,
              filled: true,
            ),
            icon: const Icon(Icons.keyboard_arrow_down),
            dropdownColor: ColorExtension.inputBackgroundColor,
            alignment: Alignment.centerLeft,
            items: names.entries
                .map((MapEntry<ScrabbleEnum<RAW_ENUM_TYPE>, String> entry) => DropdownMenuItem<String>(
                      value: entry.key.toString(),
                      child: Text(
                        entry.value,
                        style: TextStyle(color: ColorExtension.inputFontColor),
                      ),
                    ))
                .toList(),
            onChanged: (String? newValue) {
              if (newValue == null) return;

              onChange(context, defaultValue.fromString(newValue));
            },
          ),
        ),
      ],
    );
  }
}
