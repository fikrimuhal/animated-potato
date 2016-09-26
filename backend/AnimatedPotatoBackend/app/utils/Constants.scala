package utils

/**
  * Created by who on 07.08.2016.
  */
object Constants {
  final val PAGE_SIZE: Int = 20
  final val emailRegex = """^[a-zA-Z0-9\.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$""".r
  final val OK = "OK"
  final val FAIL = "FAIL"
  final val UNEXPECTED_ERROR_MESSAGE = "Beklenilmeyen bir hata oluştu "
  final val OK_MESSAGE = "İşleminiz başarıyla gerçekleştirilmiştir"
  final val SERVER_ERROR_MESSAGE = "Sunucuda beklenmeyen bir hata oluştu"
  final val NO_INTERVIEW_WITH_THIS_EMAIL = "Bu email adresiyle kayıtlı mülakat bulunamadı"
  final val TEST_HAS_SOLVED_BEFORE ="Bu testi daha önceden çözdüğünüz için tekrar çözemezsiniz"
  final val NOT_EXISTS = "Ulaşmak istediğiniz içerik bulunamadı"

}
