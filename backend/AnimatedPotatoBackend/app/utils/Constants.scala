package utils

/**
  * Created by who on 07.08.2016.
  */
object Constants {
  val PAGE_SIZE: Int = 20
  val emailRegex = """^[a-zA-Z0-9\.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$""".r
  val OK = "OK"
  val FAIL = "FAIL"
  val UNEXPECTED_ERROR_MESSAGE = "Beklenilmeyen bir hata oluştu "
  val OK_MESSAGE = "İşleminiz başarıyla gerçekleştirilmiştir"
  val SERVER_ERROR_MESSAGE = "Sunucuda beklenmeyen bir hata oluştu"
}
