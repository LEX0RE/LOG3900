import 'dart:convert';
import 'dart:typed_data';

Uint8List decodeStringImage(String image) => base64Decode(image.split(",").last);
