

var visualToggle = false;
var output = "";

var sad25 = ["You may feel that in spite of your hard work, you are not getting the results you deserve. This is a very common feeling. Don't let it get you down. ",
    "You are troubled, and you want to get over this difficult period. ",
    "With Mars moving into your 12th house, you may feel like you are taking a wrong turn in life. ",
    "You want to give up. Your life will change soon, for the better. Believe in yourself. You are a valuable human being. "];

var sad50 = ["You will have to hold back your emotions and think before you react. ",
    "You have to be careful not to push others around or your relationships will suffer. ",
    "There can be some unexpected expenses. The reason is that you are too attached to money. ",
    "The stars are not in your favor today, because of which you might lose your temper and feel like being rude. You will have to control your anger and behave yourself wisely today. Do not let your emotions get the better of you. "];

var sad75 = ["You feel that you have had enough of the superficiality of the world, and you are pulling away. This is often a good time for you to discover who you really are. ",
    "You are in a state of emotional shock, living in a world of your own. You are having a bad day, with everything going wrong, and you can't contain your feelings. ",
    "You may suffer from headaches and get irritated easily. You will be prone to accidents as you may have problems with your eyesight. ",
    "At times when you feel sad, you may feel like you are the only person who is sad. However, this is not true. There are many people who may feel even more sad than you are. "];

var sad100 = ["Today you will experience a bunch of sad feelings. You will feel lonely, sad, and even pessimistic. The main reason for this is the fact that you'll feel like the universe does not need you. ",
    "You will get frustrated because no one can give you a solution to your problems. ",
    "You might find yourself in a lot of trouble today. Avoid taking any unnecessary risks. Today's lucky color: White. ",
    "The current planetary influence will have a negative impact on your life. This is a perfect time for you to go somewhere and spend time with your friends. "];

var angry25 = ["You may suffer a major financial loss and lose your peace of mind. You may be surrounded by people but you will feel very lonely. ",
    "Your outlook for the day is positive, but you're not sure where to focus your energy. You could be a little indecisive today. ",
    "Today, you may feel like you are being pushed to do more than you can handle. But you are not alone, and you have options. Seek the help of someone you trust. ",
    "An old friend or partner in marriage can cause problems. Your family will offer you a lot of help. Don't believe in the flattery from a guy. "];

var angry50 = ["You need to be careful with the way you express yourself today. You need to make sure that you are in control of your emotions and do not allow them to get the better of you. You need to remain calm today. Your lucky match today will be the Dog. ",
    "Participating in a volunteer work will help you to vent out the anger. Do not take any decisions now. ",
    "Even though you might feel you are being treated unfairly, try to calm down and see if you are overreacting. It's better to take things in stride and not invest your emotions too heavily. ",
    "You are not in the mood to see anyone but you do not have the heart to refuse. "];

var angry75 = ["You will experience a quick temper today because of the fiery energies that are influencing you. You will feel like you are being provoked and pushed around by people. ",
    "Dear, you are likely to be at cross-purposes with someone you care about today. This person may try to criticize something you are doing, but you will be in no mood to listen to this person's comments. In fact, you may even respond aggressively to this person's comments. ",
    "You will come across many problems and conflicts today. You will try to solve the problems but most of the time you will be unsuccessful. Avoid getting into arguments with your loved ones. ",
    "You might have to rethink your office politics and strategy and then, it may not be all that bad to be in an argument with this person. "];

var angry100 = ["You are more likely to get into a fight today than any other day. You are likely to lose your temper and hurt someone's feelings. ",
    "You're not feeling good. It's not like you've seen the worst thing in the world, but you're starting to feel that you have had enough of it. ",
    "You find yourself in the same old routine at work. If you are not careful, you may have to face a possible demotion or even get fired for good. ",
    "Your luck stars are in bad shape this morning and they are working against you. You might feel a bit on edge as the storm clouds gather around you and your luck level is just not very high. "];

var surprised25 = ["It's time to make your plans. You will meet someone who will help you achieve your goals. ",
    "Pay close attention to the details of your own life and its experiences, and you'll find yourself looking at the world in a whole new way. ",
    "You are subject to a financial loss, but you will be able to restore a huge amount of money. In the end, you will be content with your fortune. ",
    "Be careful not to be too demanding today or you may end up feeling very disappointed. "];

var surprised50 = ["You may be the victim of a tragedy today. ",
    "You may find yourself today in a situation where you are trying to do something that you may have never done before and something that you are not used to doing. ",
    "You may be surprised to hear bad or unexpected news that will be a huge shock for you. ",
    "If you can stop yourself from worrying about a certain situation, you can actually prevent it from happening. "];

var surprised75 = ["Things are going to turn out great for you today, because you have the right attitude. ",
    "Don't be too demanding and don't expect too much. ",
    "You'll be visiting a place you have never been to before and you'll meet a person you know. The encounter will be very meaningful. ",
    "You are full of energy today, but your communication skills are not at their best. "];

var surprised100 = ["Your day will be full of surprise and pleasant surprises. This is when you will realize that the world is not as bad as you think it is. ",
    "You'll be able to get rid of these pent-up emotions and you'll feel much calmer afterwards. ",
    "Avoid taking financial risks as you may lose a lot of money. ",
    "You're having a good day in your relationship. Be careful though, because it may turn out to be a little too good. "];

var happy25 = ["You will be amazed at how much you can accomplish if you keep your focus on the bigger picture. ",
    "A friend is willing to help you with your job or career. ",
    "The day is favorable for your health and you may enjoy good fortune. ",
    "You'll have an amazing day, because your luck and stars align, but you can also have a bit of a stressful time, as the day will be quite hectic. "];

var happy50 = ["Mostly a great day for you! You may be a little bit distracted today. There can be some minor obstacles, but if you think quick, you can avoid them. ",
    "You will be in a good position to consider a career change, which could prove successful. ",
    "You like to have fun. You have to be careful not to get high-spirited. ",
    "You will be lucky today, but you should stay away from gambling. "];

var happy75 = ["The general atmosphere will be quiet, peaceful, and conducive for a relaxed and happy time. ",
    "You will be able to see the effect of your good work today but you need to be patient, as some things may not happen immediately. ",
    "You will think about the past, and you will dream about the future. ",
    "Great news today! Your mental energy is high. You can be very creative today. "];

var happy100 = ["Your day will be marked by an unusual peace and harmony. ",
    "Your mind will be in great shape and you will be able to accomplish a lot. ",
    "As long as you're not letting your emotions get in the way, you'll be able to do a great job of being a leader today. ",
    "You have an important meeting with people from your past, which you'll remember fondly and feel a certain nostalgia. "];

var sadoutputs = [sad25, sad50, sad75, sad100];
var angryoutputs = [angry25, angry50, angry75, angry100];
var surprisedoutputs = [surprised25, surprised50, surprised75, surprised100];
var happyoutputs = [happy25, happy50, happy75, happy100];

function setup() {
    loadCamera();
    loadTracker();
    loadCanvas(400, 300);
}

function draw() {
    fill(255);

    getPositions();
    getEmotions();

    clear();

    noStroke();
    fill(0, 150);
    rect(0, 0, width, height);

    if (emotions) {
        drawPoints();
        if (visualToggle) {
            fill(255, 50);
            rect(0, 0, width, height);
            fill(255);
            textSize(15);
            text("DAILY FORTUNE:", 10, 50);
            text(output, 10, 60, width - 10, height - 10);
        }
    }
}

function getOutput(val, emotionType) {
    var idx = 0;
    if (val >= 0 && val < 25) {
        idx = 0;
    } else if (val >= 25 && val < 50) {
        idx = 1;
    } else if (val >= 50 && val < 75) {
        idx = 2;
    } else if (val >= 75 && val < 100) {
        idx = 3;
    }
    return emotionType[idx];
}

function keyPressed() {
    if (key == "s") {
        visualToggle = true;

        var angryId = Math.floor(random(0, 4));
        var sadId = Math.floor(random(0, 4));
        var surprisedId = Math.floor(random(0, 4));
        var happyId = Math.floor(random(0, 4));

        var angryseg = getOutput(predictedEmotions[0], angryoutputs);
        var sadseg = getOutput(predictedEmotions[1], sadoutputs);
        var surprisedseg = getOutput(predictedEmotions[2], surprisedoutputs);
        var happyseg = getOutput(predictedEmotions[3], happyoutputs);
        output = angryseg[angryId] + sadseg[sadId] + surprisedseg[surprisedId] + happyseg[happyId];


        console.log(output);

    } else if (key == "c") {
        visualToggle = false;
        output = "";
    }
}

function drawPoints() {
    fill(255);
    for (var i = 0; i < positions.length - 3; i++) {
        ellipse(positions[i][0], positions[i][1], 2, 2);
    }
}