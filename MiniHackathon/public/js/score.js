window.onload = () => {
    var url = window.location.pathname.split(`/`);
    var link = url[url.length - 1];
    fetch(`../find-game`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: link,
        }),
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            for (let i = 1; i <= 4; i++) {
                document.querySelector(`.name${i}`).innerHTML = `${data.score.name[i - 1]}`;
            }
            if (data.score.score.length == 0) {
                var n = 0;
                var arr = [[]];
                var tmpCol = [];
                var colTotal = [];
                for (let i = 0; i < 4; i++) {
                    colTotal[i] = 0;
                }
                document.querySelector('.input-body').addEventListener('submit', (event) => {
                    event.preventDefault();
                    document.querySelector(`#round`).insertAdjacentHTML('beforeend', `
                    <div class='row color${n % 2}'>
                        <div class='col-4'>Round ${n + 1}</div>
                            <div  class="form-group  col-2">
                                <input class="round1${n + 1} form-control">
                            </div>
                        <div  class="form-group  col-2">
                            <input class="round2${n + 1} form-control">
                        </div>
                        <div class="form-group  col-2">
                            <input class="round3${n + 1} form-control">
                        </div>
                        <div class="form-group  col-2">
                            <input class="round4${n + 1} form-control">
                        </div>
                        </div>`);

                    n++;
                });
                document.querySelector(`#round`).addEventListener("input", () => {
                    arr = [];
                    var total = 0;
                    for (let i = 0; i < 4; i++) {
                        colTotal[i] = 0;
                        tmpCol = [];
                        for (let j = 0; j < n; j++) {
                            var x = document.querySelector(`.round${i + 1}${j + 1}`);
                            tmpCol.push(Number(x.value));
                            console.log(arr);
                            colTotal[i] += Number(x.value);
                        }
                        arr.push(tmpCol);
                        document.querySelector(`#total${i + 1}`).innerHTML = colTotal[i];
                        total += colTotal[i];
                        document.querySelector('#total-all').innerHTML = `Total Score(${total})`;

                    }
                    fetch('../update', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            score: arr,
                            id: link,
                        }),
                    })
                        .then((res) => {
                            return res.json;
                        })
                        .catch((error) => {
                            console.log(error);
                            window.alert(error.message);
                        });
                });
            } else {
                console.log('true');
                var n = data.score.score[0].length;
                console.log(n);
                var arr = [[]];
                var tmpCol = [];
                var colTotal = [];
                for (let i = 0; i < 4; i++) {
                    colTotal[i] = 0;
                }
                for (let i = 0; i < n; i++) {
                    document.querySelector(`#round`).insertAdjacentHTML('beforeend', `
                    <div class='row color${i % 2}'>
                        <div class='col-4'>Round ${i + 1}</div>
                            <div  class="form-group  col-2">
                                <input class="round1${i + 1} form-control">
                            </div>
                        <div  class="form-group  col-2">
                            <input class="round2${i + 1} form-control">
                        </div>
                        <div class="form-group  col-2">
                            <input class="round3${i + 1} form-control">
                        </div>
                        <div class="form-group  col-2">
                            <input class="round4${i + 1} form-control">
                        </div>
                    </div>`);
                }
                var x = 0;
                for (let i = 0; i < 4; i++) {
                    var totalcol = 0;
                    for (let j = 0; j < n; j++) {
                        document.querySelector(`.round${i + 1}${j + 1}`).value = data.score.score[i][j];
                        totalcol += data.score.score[i][j];
                    }
                    x += totalcol;
                    document.querySelector(`#total${i + 1}`).innerHTML = `${totalcol}`;
                }
                document.querySelector(`#total-all`).innerHTML = `Total Score(${x})`;


                document.querySelector('.input-body').addEventListener('submit', (event) => {
                    event.preventDefault();
                    document.querySelector(`#round`).insertAdjacentHTML('beforeend', `
                    <div class='row color${n % 2}'>
                        <div class='col-4'>Round ${n + 1}</div>
                            <div  class="form-group  col-2">
                                <input class="round1${n + 1} form-control">
                            </div>
                        <div  class="form-group  col-2">
                            <input class="round2${n + 1} form-control">
                        </div>
                        <div class="form-group  col-2">
                            <input class="round3${n + 1} form-control">
                        </div>
                        <div class="form-group  col-2">
                            <input class="round4${n + 1} form-control">
                        </div>
                    </div>`);
                    n++;
                });
                document.querySelector(`#round`).addEventListener("input", () => {
                    arr = [];
                    var total = 0;
                    for (let i = 0; i < 4; i++) {
                        colTotal[i] = 0;
                        tmpCol = [];
                        for (let j = 0; j < n; j++) {
                            var x = document.querySelector(`.round${i + 1}${j + 1}`);
                            tmpCol.push(Number(x.value));
                            colTotal[i] += Number(x.value);
                        }
                        arr.push(tmpCol);
                        document.querySelector(`#total${i + 1}`).innerHTML = colTotal[i];
                        total += colTotal[i];
                        document.querySelector('#total-all').innerHTML = `Total Score(${total})`;

                    }
                    fetch('../update', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            score: arr,
                            id: link,
                        }),
                    })
                        .then((res) => {
                            return res.json;
                        })
                        .catch((error) => {
                            console.log(error);
                            window.alert(error.message);
                        });
                });
            }
        })
        .catch((er) => {
            console.log(er);
            window.alert(er.message);
        });



}