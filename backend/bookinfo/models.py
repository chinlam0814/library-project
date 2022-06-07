from django.db import models

# Create your models here.

class BookInfo(models.Model):
    ART = '艺术'
    BIOGRAPHY = '传记与自传'
    BUSINESS = '商业与投资'
    NOVEL = '小说'
    CHINESE_CULTURE = '中国文化'
    FOREIGN_CULTURE = '外国文化'
    LITERATURE = '文学'
    PHILOSOPHY = '哲学'
    CHILDREN_BOOK = '儿童读物'
    COMICS = '漫画'
    CHINA_HISTORY = '中国历史'
    FOREIGN_HISTORY = '外国历史'
    SAINS = '科学'
    TECHNOLOGY = '科技'
    EDUCATION = '教育'
    FAMILY_PARENTING = '家庭与育儿'
    HOME_GARDENING = '家居与园艺'
    ENTERTAINMENT = '休闲娱乐'
    MEDICINE = '医学'
    LAW = '法律'
    TRAVEL_NATURE = '旅游与自然'
    SPORTS = '体育'
    INFORMATION_TECHNOLOGY = '计算机与网络'
    RELIGION = '宗教与精神生活'
    REFERENCE_BOOK = '参考书'
    OTHERS = '其他'


    CATEGORIES = [
        (LAW, '法律'),
        (EDUCATION, '教育'),
        (TECHNOLOGY, '科技'),
        (SAINS, '科学'),
        (COMICS, '漫画'),
        (SPORTS, '体育'),
        (LITERATURE, '文学'),
        (NOVEL, '小说'),
        (ART, '艺术'),
        (MEDICINE, '医学'),
        (PHILOSOPHY, '哲学'),
        (REFERENCE_BOOK, '参考书'),
        (CHILDREN_BOOK, '儿童读物'),
        (FOREIGN_HISTORY, '外国历史'),
        (FOREIGN_CULTURE, '外国文化'),
        (ENTERTAINMENT, '休闲娱乐'),
        (CHINA_HISTORY, '中国历史'),
        (CHINESE_CULTURE, '中国文化'),
        (HOME_GARDENING, '家居与园艺'),
        (FAMILY_PARENTING, '家庭与育儿'),
        (TRAVEL_NATURE, '旅游与自然'),
        (BUSINESS, '商业与投资'),
        (BIOGRAPHY, '传记与自传'),
        (INFORMATION_TECHNOLOGY, '计算机与网络'),
        (RELIGION, '宗教与精神生活'),
        (OTHERS, '其他'),
    ]

    title = models.CharField(null = False, blank = False, max_length = 100)
    author = models.CharField(null = False, max_length = 100)
    isbn = models.CharField(null = False, max_length = 100)
    publisher = models.CharField(null = False, max_length = 100)
    pubdate = models.DateField(null = True)
    type = models.CharField(null = True, max_length = 50, choices = CATEGORIES, default = LAW)
    stock = models.IntegerField(null = True, default=0)
    synopsis = models.TextField(null = True, max_length=501)

    def __str__(self):
        return self.title

    def body(self):
        return{
            'id' : self.id,
            'title' : self.title,
            'author' : self.author,
            'isbn' : self.isbn,
            'publisher' : self.publisher,
            'pubdate' : self.pubdate,
            'type' : self.type,
            'synopsis' : self.synopsis,
            'stock' : self.stock,
        }

    class Meta:
        verbose_name = "Book"

class BookImage(models.Model):
    image = models.ImageField(upload_to="book_images",null = True)
    book = models.ForeignKey(BookInfo, on_delete = models.CASCADE, null = False)

    def __str__(self):
        return self.book.title + "image"

    def body(self):
        return {
            'id': self.id,
            'book': self.book.body(),
            'image_url': 'http://localhost:8000' + self.image.url
        }