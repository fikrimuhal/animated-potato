#!/bin/bash

update-docker-hosts(){
    # clear existing *.docker.local entries from /etc/hosts
    sudo sed -i '' '/\.docker\.local$/d' /etc/hosts

    # iterate over each machine
    docker-machine ls | tail -n +2 | awk '{print $1}' \
        | while read -r MACHINE; do
        MACHINE_IP="$(docker-machine ip ${MACHINE} 2>/dev/null)"
        [[ -n $MACHINE_IP ]] && sudo /bin/bash -c "echo \"${MACHINE_IP}    ${MACHINE}.docker.local\" >> /etc/hosts"
        export no_proxy=$no_proxy,$MACHINE_IP
    done
}

update-docker-hosts
