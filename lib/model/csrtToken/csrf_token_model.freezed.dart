// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'csrf_token_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
mixin _$CsrfTokenModel {
  String get token => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $CsrfTokenModelCopyWith<CsrfTokenModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CsrfTokenModelCopyWith<$Res> {
  factory $CsrfTokenModelCopyWith(
          CsrfTokenModel value, $Res Function(CsrfTokenModel) then) =
      _$CsrfTokenModelCopyWithImpl<$Res, CsrfTokenModel>;
  @useResult
  $Res call({String token});
}

/// @nodoc
class _$CsrfTokenModelCopyWithImpl<$Res, $Val extends CsrfTokenModel>
    implements $CsrfTokenModelCopyWith<$Res> {
  _$CsrfTokenModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? token = null,
  }) {
    return _then(_value.copyWith(
      token: null == token
          ? _value.token
          : token // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_CsrfTokenModelCopyWith<$Res>
    implements $CsrfTokenModelCopyWith<$Res> {
  factory _$$_CsrfTokenModelCopyWith(
          _$_CsrfTokenModel value, $Res Function(_$_CsrfTokenModel) then) =
      __$$_CsrfTokenModelCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String token});
}

/// @nodoc
class __$$_CsrfTokenModelCopyWithImpl<$Res>
    extends _$CsrfTokenModelCopyWithImpl<$Res, _$_CsrfTokenModel>
    implements _$$_CsrfTokenModelCopyWith<$Res> {
  __$$_CsrfTokenModelCopyWithImpl(
      _$_CsrfTokenModel _value, $Res Function(_$_CsrfTokenModel) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? token = null,
  }) {
    return _then(_$_CsrfTokenModel(
      token: null == token
          ? _value.token
          : token // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc

class _$_CsrfTokenModel implements _CsrfTokenModel {
  _$_CsrfTokenModel({required this.token});

  @override
  final String token;

  @override
  String toString() {
    return 'CsrfTokenModel(token: $token)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_CsrfTokenModel &&
            (identical(other.token, token) || other.token == token));
  }

  @override
  int get hashCode => Object.hash(runtimeType, token);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_CsrfTokenModelCopyWith<_$_CsrfTokenModel> get copyWith =>
      __$$_CsrfTokenModelCopyWithImpl<_$_CsrfTokenModel>(this, _$identity);
}

abstract class _CsrfTokenModel implements CsrfTokenModel {
  factory _CsrfTokenModel({required final String token}) = _$_CsrfTokenModel;

  @override
  String get token;
  @override
  @JsonKey(ignore: true)
  _$$_CsrfTokenModelCopyWith<_$_CsrfTokenModel> get copyWith =>
      throw _privateConstructorUsedError;
}
