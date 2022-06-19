const badRequestError = 'Ошибка: 400';
const unathorizedError = 'Ошибка: 401';
const forbiddenError = 'Ошибка: 403';
const notFoundError = 'Ошибка: 404';
const conflictError = 'Ошибка: 409';
const internalServerMessage = 'На сервере произошла ошибка';
const invalidFilmDataMessage =
  'Переданы некорректные данные при добавлении фильма';
const invalidIdMessage = 'Невалидный id';
const filmIdNotFoundMessage = 'Фильм с указанным _id не найден';
const deleteForeignFilmMessage =
  'Удаление фильмов других пользователей запрещено';
const invalidUpdateDataMessage =
  'Переданы некорректные данные при обновлении профиля';
const invalidCreateDataMessage =
  'Переданы некорректные данные при создании пользователя';
const userIdNotFoundMessage = 'Пользователь с указанным _id не найден';
const emailIsUsedMessage = 'Данный email уже используется';
const wrongEmailOrPassword = 'Неправильные почта или пароль';

module.exports = {
  badRequestError,
  conflictError,
  forbiddenError,
  notFoundError,
  unathorizedError,
  internalServerMessage,
  invalidFilmDataMessage,
  invalidIdMessage,
  invalidUpdateDataMessage,
  invalidCreateDataMessage,
  filmIdNotFoundMessage,
  userIdNotFoundMessage,
  deleteForeignFilmMessage,
  emailIsUsedMessage,
  wrongEmailOrPassword,
};
