import java.text.SimpleDateFormat;
import java.util.Date;

public class test {

    public static void main(String[] args) {
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        //DateFormatUtils.format(date,"yyyyMMdd");
        String mysqlDateString = formatter.format(date);
        System.out.println(mysqlDateString);
    }
}
