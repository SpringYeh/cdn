---
layout: false
---

<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Chrome Game</title>
    <link rel="stylesheet" href="./main.css">
    <script type="text/javascript" src="https://cdn.staticfile.org/jquery/1.2.3/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/SpringYeh/cdn/proj/dinosaur/main.js"></script>
</head>

<body id="t">
    <div id="main-frame-error" class="interstitial-wrapper" jstcache="0">
        <div class="onlyforchrome" style="font-weight:bold; font-size:30px;text-align:center;color:#777E8C;">
            恐龙快跑
        </div>
        <div class="onlyforchrome"
            style="margin-top:15px;text-align:center;color:#8a8a8a;margin-bottom:20px; font-size:.7em;line-height:1.2em;">
            <span id="firsttimeinfo">按空格键跳跃，按向下方向键下蹲</span>
        </div>
        <div id="main-frame-notchrome" style="display:none; margin-top:50px;">抱歉，这个游戏仅可在 webkit 内核的浏览器里运行！</div>
        <div id="offline-resources" jstcache="0">
            <img id="offline-resources-1x"
                src="data:image/png;base64,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"
                jstcache="0">
            <img id="offline-resources-2x"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACYkAAACCBAMAAAD7gMi8AAAAIVBMVEUAAAD39/fa2tr///+5ublTU1P29vbv7+/+/v74+Pjw8PCjSky4AAAAAXRSTlMAQObYZgAADDlJREFUeAHs3StsLEmWh/Gvy2WuJBe3gs9r3RwFV7+Ss36h4cgcLZnXchbkcgVc6GqZg9TlJJpb7odDLh0pFBN2ONPOqvT/J3U568Q5OTs7M+WTJ6PSrEZEREREPgMYaEksxQETyxpIz8oitQNXcJhVYlmWt+hCqbvC8WCaEWP2GSZK/uYXHlx+CXcfj4f5aARykBGyYIkjx9UcsljOy4fFWcY/XnJuwM73qoZKLG0g99TsOGciIntg8LTERI92H+AcE29u8BBTK3DlgMOcEsuyvOUXSp0VE6uZwLE8EfaInIDxLjBefnm8Pswh8sXk5RgIx7e2Sn6bjRAsxmi1X37EzoIJx6tW2YL9k60YPs6/jHZMZBOOBQ14Iuk5PYqPqRqwvspxmFFiWZa3/EI5nmtXGEfBYlMrz4Lt8abFrO9q523fAPgiFs8+14zF+/Ce5mIOkaMPfHfNHCJ7a8U6mrHOj24HE+dsSEXg6sA6bDzXb3qV3Ak3ZzT2Z36+AUaAkK/7uPv4pf1uH6G8bxnGx9CI3Xu0ise3+VSvQnSPcgKR7MN33wHf5deXEtmf/yeXTca6eioLXHGoNVmWMZTd6JUrSt6MjefalpuKucagsxGbcE/n/Tkf/MxW+fp/WTeRO1YiYdOfYt0XmCK2mzUfPfxTXj2S7z3ataVdeYYRxsejvJrZkagX6/joPh2VnioHrly1ybKMweNj0Yq5sqTfAGn7F/LN0VgEDze/sGETbtXz9ueCm5+7+V5swjnyTxC5/jtLEvVi0dMlMC62sWIAUld2VweYe6pUBpwDN2FN1qHMoMVKlr/Z2N/WLTUVm4pYczI2uZdPxoj+JkKdfReSu2BXj+UNyJxzXP2SkEvvPl5++ZAbHt8/5uWMFnFM83O33ou5CaZ8wPJERL0Y0S/+yb4pQ1rnZmNpSGVbd4rEncB5nab7C5vKe5UituEVM9qdyMq+1vzScmfDDkveItkzsxkbn/r8n3q+EwmR1JUd8e3J2JCagXpJx33O9e+3tts614hNz8wzfXvGXDPvJMnUm7u+vR7VIiKb6cWiNWP5jd/CPKy+R6yvpHHTch2V+61t08lvoAqXX47Ys1kvR+zeYgjjcV+rsVh9dbQH9RSLxb+GzJu36VmvzvGOyYdrexWZ34tFO/L24602iw/4Wdk2GWv3TmXgyZLlN3ENpI6KTfvz/9rrC4nsV7+4EO3bf3i9C9htSDuwQxOKmB0VZynOZxmBTdKnWLSgt55MlnsQmC1EUkeFdW/9jWDtq16OR1PfHcr+u5STq+ZNuMdYjJBfRU5sLuYc7pnDv8mxFNGzXkVXlHZvEjyRtzPgG/OtdjZF5ToGSLW9+dUFHzGNCluJaUYjeKLsWa+nRjQXc0xMTzZaIh++ZILvfuH/EFnyU8xrk8yyUzBb6D+VdW9p4S9prs+e9bp98cxy1YtN5ZHI00Z7yk4RrweDPdm1OImdpyZXZWHWOS0eWJXsl2nF4iJTMXtvUjt7/SfNtpsfW1ijj3I8mCox+mPtu5R9scnl2Aae9Srau4/INXOI7N/9VOyAYx1iz3otruNMjufH9pTGP+JUBNrsynGs/iv2nNPOQ/mg4qHyP6uYM84hF8t9pqBeTPQ9SpHXnu73fMzPmooV7yKpI7vF1wOtZsyf1Nf5B5K+RylyUr2YyPXj6/gl4SOUHuPh48NB6XIEENnzrsQ0lAE4AK5dsvr3pood/APbsJnvUQ54YnGl4jmKZ50LI6GMVOdhF38FuL+ln5WqFxMR9WLzf9X0i5jac8PApI7sRCGmauDAlc262iXZwVIdb6L4/qVnm2yD68yTQKCP3ffsPOeI9HddhfvbWaU7zoKIiOZiEVIzkE2HoZVh3RjOSlhDTDAk5MQUVyomnWNuZ/u5+/zXTxdXuUOqdk55YfHSPesR+fDT///xz7X9CREojRQsuZof6GUn5HKsniH0XwLLSr1YnP2rpl9ZFyuzLhOB1JGdLGSFRaBoxVoZ5sDVIq3YMK8V8zHZqc5zw9gX2i72nlxcPXRdACb3YC8vvb/dsSKRf/Id14gs0ov5uMUnjaXoG4HCBAfqJb5Z8mKeXtaSFn+U0nOOIvx8EyHUv9Vo31UESneBZd2FnitEuwgN5Q3y2gVCxJxf7kigfoFfXoLvnDVXRef0sEBpidIdaxH58N13wHf5VWReL1ZvxjzdH93zpcqsy2Z2qS+7txk7QH/J/CaxX+KM6FmvYqzLsoj79dOs0j1rErGructx2WfGNi4Dcw6hthS6zpkvQkeLr0H2GM8WpQi+Eugr8WR++Yndemda39ae9eqJ+bUU8WefOxLyaylUYjtHjS3cfbRJ5wKlO9Yj8gH45zUziOwX/VWzvPbszSZjjezEgKkFSpWSMHgexXQSLdSQ7Ch6ztSfb7644Yb69Z0F70JHvMGqOpYsVIsH5F0/X0zkOv8zg8iePhLTSUzGBh+THZ3vZCx6YmQzPHVxA7kjdQHz62T3ERvsRs4ipTvOmYjIfvlfNcsrd4u1J2OWvbzYPu1QHrUXUgS8LXTI2/btKEXsVGbCAW4qY6YrVjG9LObIMRHNxUR/jlJkTw9JNPjyKKahuhATWYKhWlHv3hqSJR4PYuIcxMg7kDaca+4PF3+18VZf6W13qdmBiIh6scRriM88fyJSRk5BTB1xW6l3bwPPYxWIaC4mInLydqQ4e4eUpFgJxmQLHa1YrC/0sIppApwDk2OZq8TKvKanqlw9zzmLbURKMW41F0J4/mTsll+nT/Sy0vfXi4mI7J/eQh6T7cl6S5G04lxu/j78mCoLEWi3YgmraIzLzqZ/lkjabG7QXGw2EZE9kOKsPieSkBR9peUqFixq2hW2YNE2q8A4Jk6FY5PscmV7uRAYl98z9uunhUp3nDsRUS9Gmv/R3W9rHV6K9T9kaQstRYXHpGq0JT33O5JuejJvznco3VN5IpqLiYjskYUkYOhaaPd1vjF6k7OZjMVN5NYnY6FnMmYDrePSzh0j97ezSnecMxGR/exfNWczskqNwMFe+0uWR4Kh8beZOrQnXo7OyZimYv1EczEREc3F0pOBw/ySN5AYbEaGB/JLTDzJdXVAriMXp81izccOpw3k1iZjobFnjIu/luMt7Eliv5aRmaU7zpmIyH6BXzXr7hbTdwViet3JGE5TMZkn77XffZ5/LF+6YzUiIpqLqRmLkDBLjcbcs1OdhmKVP5RvP5fPBY+HOEBq5UZY+P+GwGg/m3L7ZBu8Ho7M/YEWK8pHO/dwYKXqxUREvVj50b28pKnYs6SIf/ZYcgJcPeZgauXloOuZieHaebJ1F3+t/Y0jcl91cXV/21OaWal6sXdLRL3Y2NipP67z+EdJA70cTHqs2Bvs6IskrFdeNncgHoNVOQOPJy74f4MJzclY0T6RB1z3t/SwootftXdfRNSLlf1V5aM7sLSELI9p4Vj/GWTz7NkUlPh1ymu3M0rVi4mI7lGuTUR/9aidb5Ox/HONv3pk7dOMqdixM6vet1QvJiLqxSKJHiKiWdn8UvViIqJebAQiItLkiSQ7Wjz3aZa19P8NI6E4arRPj/v1L/omY7bVrKReTET0xOrwBwDvhwHsSCqGJRd6DbxLok8xERHtFxsD79aQBuyNj+mlC8YWOljFGiTa0eK5/Zb9vyHYUceuMTOrSL2YiOiZFqH50a0HWgw+enuXYnr5gjVptjAkKhoVZ0BEczERkc94DZqLpZcvFE1aTMdQyj+OsSHlNzHVKt4nUS8mIqJeTKxx6l6oN2l5weZiOZ4eCwZI/73i9/buAjdyIIgCaC34fBv6lwyfL8zJBhYslQda7wkz2F1Tir+5EchiADhw/9+PO3AfWQwAAADso4TUg8vzaqCAswpruxgAkNS9KTvVQAFnFFYWAwCSVAljbQWcUVhZDABI6sWUvtCggL2FlcUAvlVqRHBUb6adevP5UKfUPyngvwu7CkcDZDEAIEmtaesOtosBOI8Spp3tvnUXshggi2XhBVgalpANQ22byQAaZqevGuirMbMYQJJUn3z+/GqVzBnBZ1liKPOHlKRhH9uyb01VJTM+QV+1iL4aKosBkO7PWF6yohokqU2nr/SVLAaQuf/fk2TZ7QBJGieXjBBRks0PIvqqgb4aNIsB9k4mq9vrlEHLudzvkw1f3kZfLURf9WcxAAAAuAMrmVNBFPg6WAAAAABJRU5ErkJggg=="
                jstcache="0">
            <template id="audio-resources" jstcache="0"></template>
        </div>
        <script type="text/javascript">
            if (isWebkit) {
                new Runner('.interstitial-wrapper');
            } else {
                document.getElementById("main-frame-notchrome").style.display = "block";
                hideClass("onlyforchrome");
            }
        </script>
        <div class="runner-container">
            <canvas class="runner-canvas" width="1200" height="300" id="gamecanvas"></canvas>
        </div>
    </div>

</body>

</html>