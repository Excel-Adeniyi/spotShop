import 'package:freezed_annotation/freezed_annotation.dart';

part 'csrf_token_model.freezed.dart';
@freezed
class CsrfTokenModel with _$CsrfTokenModel{
  factory CsrfTokenModel({
    required String token
}) = _CsrfTokenModel;
}