package utils

import scala.concurrent.duration._

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
  final val TEST_HAS_SOLVED_BEFORE = "Bu testi daha önceden çözdüğünüz için tekrar çözemezsiniz"
  final val NOT_EXISTS = "Ulaşmak istediğiniz içerik bulunamadı"
  final val UNAUTHORIZED = "UNAUTHORIZED"
  final val UNAUTHORIZED_ACCESS = "Unauthorized Access"
  final val FORBIDDEN = "FORBIDDEN"
  final val FORBIDDEN_MESSAGE = "Forbidden Access"
  final val SESSION_TIME_OUT = "SESSION_TIME_OUT"
  final val SESSION_TIME_OUT_MESSAGE = "Oturumunuz zaman aşımına uğradı, lütfen tekrar giriş yapınız."
  final val SESSION_MAX_AGE: FiniteDuration = 3 days
  final val CLAIM_DATA_KEY = "claimData"
  final val WRONG_PASSWORD = "Kullanıcı adı veya şifre hatalı"
  final val USERNAME_EXISTS = "Kullanıcı adı daha önceden alınmış"
  final val EMAIL_EXISTS = "Email daha önceden alınmış"
}
