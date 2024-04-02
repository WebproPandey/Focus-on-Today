let allcheckbox = document.querySelectorAll(".custom-checkbox")
let allinput = document.querySelectorAll(".input-goal")
let error = document.querySelector(".error-lable")
let progressbar = document.querySelector(".progress-bar")
var progressvalue = document.querySelector(".progress-value")
let perachange = document.querySelector(".pera")
let fotterpera = document.querySelector(".fotterpera")
var appContainer = document.querySelector('.app-container')
var btn = document.querySelector(".button")



let allQuotes = [
    'Raise the bar by completing your goals! ',
    'Well begun is half done!',
    'just a step away ,keep going!',
    'Wow! You just completed all goals,time for chill :Dude👌'
]

let fotterperas =
    [
        'Move one step ahead today!',
        'Move one step ahead today!',
        'Move one step ahead today!',
        "keep Going, you're making great progrees!",
    ]



var allgoal = JSON.parse(localStorage.getItem('allgoal')) ||
{
    first:
    {
        name: "",
        completed: false
    },
    second:
    {
        name: "",
        completed: false
    },
    third:
    {
        name: "",
        completed: false
    },
   

}

let allcompletedgoalcount = Object.values(allgoal).filter((goal) => goal.completed).length
progressvalue.style.width = `${allcompletedgoalcount / allinput.length * 100}%`
progressvalue.firstElementChild.innerText = `${allcompletedgoalcount} /${allinput.length} completed`
perachange.innerText = allQuotes[allcompletedgoalcount]
fotterpera.innerText = fotterperas[allcompletedgoalcount]


function showpopup() {
    if (allcompletedgoalcount === 3) {
        setTimeout(() => {
            appContainer.classList.remove("popup")
        }, 3000)
    }
    else {
        appContainer.classList.add("popup")
    }

}
showpopup()

function noshow() {
    btn.addEventListener('click', function () {
        setTimeout(() => {
            appContainer.classList.add("popup")
        }, 2000)
        if (localStorage.getItem("allgoal")) {
            localStorage.removeItem("allgoal");
            location.reload();
        }

    })
}
noshow()


allcheckbox.forEach(function (checkbox) {
    checkbox.addEventListener("click", (elem) => {
        var allfiledfilled = [...allinput].every(function (input) {
            return input.value
        })
        if (allfiledfilled) {
            checkbox.parentElement.classList.toggle("completed")
            let inputId = checkbox.nextElementSibling.id

            allgoal[inputId].completed = !allgoal[inputId].completed
            allcompletedgoalcount = Object.values(allgoal).filter((goal) => goal.completed).length
            progressvalue.style.width = `${allcompletedgoalcount / allinput.length * 100}%`
            progressvalue.firstElementChild.innerText = `${allcompletedgoalcount} /${allinput.length} completed`
            perachange.innerText = allQuotes[allcompletedgoalcount]
            fotterpera.innerText = fotterperas[allcompletedgoalcount]
            if (allcompletedgoalcount === 3) {
                showpopup()
            }
            else {
                noshow()
            }
            localStorage.setItem('allgoal', JSON.stringify(allgoal))

        }
        else {
            progressbar.classList.add("show-error")
        }
    })
})

allinput.forEach((input) => {
    input.value = allgoal[input.id].name
    if (allgoal[input.id].completed) {
        input.parentElement.classList.add('completed')
    }
    input.addEventListener("focus", () => {
        progressbar.classList.remove('show-error')
    })
    input.addEventListener('input', function (e) {

        if (allgoal[input.id].completed) {
            input.value = allgoal[input.id].name
            return
        }
        allgoal[e.target.id].name = input.value

        localStorage.setItem('allgoal', JSON.stringify(allgoal))
    })
})

