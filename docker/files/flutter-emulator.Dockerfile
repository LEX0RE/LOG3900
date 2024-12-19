FROM ubuntu:latest

# Configuration des variables d'environnement
ENV ANDROID_HOME /opt/android-sdk
ENV PATH $PATH:$ANDROID_HOME/emulator
ENV PATH $PATH:$ANDROID_HOME/cmdline-tools/latest
ENV PATH $PATH:$ANDROID_HOME/cmdline-tools/latest/bin
ENV PATH $PATH:$ANDROID_HOME/platform-tools
ENV JAVA_HOME /usr/lib/jvm/java-11-openjdk-amd64/

# Pré-requis
RUN apt update && apt install -y wget libpulse0 unzip git openjdk-11-jdk curl clang cmake ninja-build pkg-config libgtk-3-dev

USER root
WORKDIR /home

# Télécharge Android Studio
RUN wget --quiet https://redirector.gvt1.com/edgedl/android/studio/ide-zips/2022.1.1.20/android-studio-2022.1.1.20-linux.tar.gz -O /tmp/android-studio.tar.gz && \
    tar -xzf /tmp/android-studio.tar.gz -C /opt/ && \
    rm /tmp/android-studio.tar.gz

# Installe le Command Line Tools
RUN mkdir -p /opt/android-sdk/cmdline-tools/ && \
    cd /opt/android-sdk/cmdline-tools/ && \
    wget --quiet https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip -O cmdline-tools.zip && \
    unzip cmdline-tools.zip && \
    rm cmdline-tools.zip

# Configuration pour Android Studio et le Command Line Tools
RUN mv /opt/android-sdk/cmdline-tools/cmdline-tools /opt/android-sdk/cmdline-tools/latest
RUN mv /opt/android-studio/jbr /opt/android-studio/jre

# Accepte les licences des SDK
RUN yes | sdkmanager --licenses

# Met à jour les SDK
RUN sdkmanager --update

# Installe les outils et les plates-formes nécessaires
RUN sdkmanager "build-tools;28.0.3" "patcher;v4" "platform-tools" "emulator" "platforms;android-29" "sources;android-29"

# Ajout de chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN yes | apt install ./google-chrome-stable_current_amd64.deb

# Téléchargement de Flutter SDK
RUN git clone https://github.com/flutter/flutter.git
ENV PATH "$PATH:/home/flutter/bin"
RUN yes | flutter doctor --android-licenses

# Lancement de la vérification et de l'installation de Dart
RUN flutter doctor
