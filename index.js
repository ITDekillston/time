function getCookie(name) {
    let cookie = document.cookie.split('; ').find(row => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
}
//
var counter = {
    check: 0,
    start: () => {
        var d_time = getCookie('d_time');
        //
        if(d_time == null || d_time == 'delete') {
            const da = new Date() / 1000;
            //  
            document.cookie = 'd_time='+da;
            //
            d_time = da;
        } else {
            d_time = Number(d_time);
        }
        //
        //
        var d_check = getCookie('d_check');
        //
        if(d_check == null || d_check == 'delete') {
            document.cookie = 'd_check=0';
            //
            d_check = 0;
        } else {
            if(d_check == 'NaN') {
                d_check = 0;
            } else {
                d_check = Number(d_check);
            }
        }
        counter.check = d_check;
        //
        counter.block_check(d_check);
        //
        setInterval(() => {
            var s = Math.floor(new Date() / 1000-d_time);
            //
            var ms = [0, 0];
            //
            ms[0] = (Math.floor(s/60));
            //
            ms[1] = s-(ms[0]*60);
            //
            counter.block_time(ms);
        }, 1000);
    },
    plus: () => {
        counter.check = counter.check+1;
        //
        document.cookie = 'd_check='+counter.check;
        //
        counter.block_check(counter.check)
    },
    minus: () => {
        if(counter.check-1 > -1) {
            counter.check = counter.check-1;
            //
            document.cookie = 'd_check='+counter.check;
            //
            counter.block_check(counter.check)
        }
    },
    block_check: (n) => {
        document.querySelector('.check').textContent = n;
    },
    block_time: (m) => {
        function nicak(num) {
            const n = String(num).length;
            //
            if(n > 1) {
                return num;
            } else {
                return '0'+num;
            }
        }
        //
        document.querySelector('.time').textContent = nicak(m[0])+':'+nicak(m[1]);
    }
};
counter.start();
//
document.addEventListener('keydown', function(e) {
    if(e.code == 'Space') {
        counter.plus();
    } else if(e.code == 'ArrowDown') {
        counter.minus();
    }
});
document.querySelector('.restart').onclick = () => {
    document.cookie = 'd_check=delete';
    document.cookie = 'd_time=delete';
}
//
