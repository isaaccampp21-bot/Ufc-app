import React, { useState, useEffect } from "react";
import {
  View, Text, TouchableOpacity, TextInput, StyleSheet, Animated, Alert, ScrollView, Modal
} from "react-native";

// Componente para renderizar o ícone do cinturão customizado
const IconeCinturao = ({ cor }) => (
  <View style={styles.cinturaoContainer}>
    <View style={[styles.cinturaoBase, { backgroundColor: cor === 'gold' ? '#FFD700' : '#C0C0C0' }]} />
    <View style={[styles.cinturaoCirculo, { backgroundColor: cor === 'gold' ? '#DAA520' : '#A9A9A9' }]} />
  </View>
);

export default function App() {
  const [tela, setTela] = useState("menu_inicial");
  const [menuVisivel, setMenuVisivel] = useState(false);
  const [modoTreino, setModoTreino] = useState(false);
  const [valeCinturao, setValeCinturao] = useState(null); 

  // HISTÓRICO ATUALIZADO COM CINTURÕES ESPECÍFICOS
  const [historicoEventos, setHistoricoEventos] = useState([
    { nome: "UFC Fight Night 4", lutasAgendadas: [
        { lutador1: "Luan Ologna", lutador2: "Kaleb Khabib", status: "Finalizada", resultado: { vencedor: "Luan Ologna", metodo: "TKO", round: 2, turno: "-", nomeDoEvento: "UFC Fight Night 4" } },
        { lutador1: "Luís Adolfo", lutador2: "Benio The Black", status: "Finalizada", resultado: { vencedor: "Luís Adolfo", metodo: "TKO", round: 5, turno: "-", nomeDoEvento: "UFC Fight Night 4" } }
    ]},
    { nome: "UFC Coliseu", lutasAgendadas: [
        { lutador1: "João Caralhão", lutador2: "Charles William", status: "Finalizada", resultado: { vencedor: "João Caralhão", metodo: "DEC", round: "-", turno: "-", nomeDoEvento: "UFC Coliseu" } },
        { lutador1: "Enzo Dela Vega", lutador2: "Miguel Bolinha", status: "Finalizada", cinturao: true, corCinturao: 'silver', resultado: { vencedor: "Miguel Bolinha", metodo: "SUB", round: 2, turno: "-", nomeDoEvento: "UFC Coliseu" } },
        { lutador1: "Thallysson W", lutador2: "Arthur China", status: "Finalizada", cinturao: true, corCinturao: 'gold', resultado: { vencedor: "Arthur China", metodo: "SUB", round: 1, turno: "-", nomeDoEvento: "UFC Coliseu" } }
    ]},
    { nome: "UFC Fight Night 3", lutasAgendadas: [
        { lutador1: "Pedro Bellingham", lutador2: "Arthur Jackson", status: "Finalizada", resultado: { vencedor: "Pedro Bellingham", metodo: "DEC", round: "-", turno: "-", nomeDoEvento: "UFC Fight Night 3" } },
        { lutador1: "Nina Di Casteli", lutador2: "Joana The Pig", status: "Finalizada", resultado: { vencedor: "Nina Di Casteli", metodo: "SUB", round: 1, turno: "-", nomeDoEvento: "UFC Fight Night 3" } },
        { lutador1: "Gonçalves", lutador2: "Bryan Brancão", status: "Finalizada", resultado: { vencedor: "Gonçalves", metodo: "DEC", round: "-", turno: "-", nomeDoEvento: "UFC Fight Night 3" } }
    ]},
    { nome: "UFC 329", lutasAgendadas: [
        { lutador1: "Bryan Brancão", lutador2: "Kaleb Khabib", status: "Finalizada", resultado: { vencedor: "Bryan Brancão", metodo: "DEC", round: "-", turno: "-", nomeDoEvento: "UFC 329" } },
        { lutador1: "Charles William", lutador2: "William Pretão", status: "Finalizada", resultado: { vencedor: "Charles William", metodo: "SUB", round: 2, turno: "-", nomeDoEvento: "UFC 329" } },
        { lutador1: "Enzo Dela Vega", lutador2: "Gonçalves", status: "Finalizada", cinturao: true, corCinturao: 'silver', resultado: { vencedor: "Enzo Dela Vega", metodo: "DEC", round: "-", turno: "-", nomeDoEvento: "UFC 329" } }
    ]},
    { nome: "UFC Fight Night 2", lutasAgendadas: [
        { lutador1: "Nina Di Casteli", lutador2: "Charlotte", status: "Finalizada", resultado: { vencedor: "Nina Di Casteli", metodo: "SUB", round: 2, turno: "-", nomeDoEvento: "UFC Fight Night 2" } },
        { lutador1: "Miguel Bolinha", lutador2: "Arthur China", status: "Finalizada", resultado: { vencedor: "Miguel Bolinha", metodo: "SUB", round: 1, turno: "-", nomeDoEvento: "UFC Fight Night 2" } },
        { lutador1: "Thallysson W", lutador2: "Arthur Jackson", status: "Finalizada", resultado: { vencedor: "Thallysson W", metodo: "SUB", round: 3, turno: "-", nomeDoEvento: "UFC Fight Night 2" } }
    ]},
    { nome: "UFC Fight Night 1", lutasAgendadas: [
        { lutador1: "Volkova", lutador2: "Mary", status: "Finalizada", resultado: { vencedor: "Mary", metodo: "SUB", round: 1, turno: "-", nomeDoEvento: "UFC Fight Night 1" } },
        { lutador1: "Joana The Pig", lutador2: "Mc Soares", status: "Finalizada", resultado: { vencedor: "Joana The Pig", metodo: "DEC", round: "-", turno: "-", nomeDoEvento: "UFC Fight Night 1" } },
        { lutador1: "João Caralhão", lutador2: "Bryan Brancão", status: "Finalizada", resultado: { vencedor: "João Caralhão", metodo: "SUB", round: 2, turno: "-", nomeDoEvento: "UFC Fight Night 1" } }
    ]},
    { nome: "UFC 328", lutasAgendadas: [
        { lutador1: "Charles William", lutador2: "Pedro Murilo", status: "Finalizada", resultado: { vencedor: "Charles William", metodo: "SUB", round: 3, turno: "-", nomeDoEvento: "UFC 328" } },
        { lutador1: "Arthur China", lutador2: "Thallysson W", status: "Finalizada", resultado: { vencedor: "Arthur China", metodo: "DEC", round: "-", turno: "-", nomeDoEvento: "UFC 328", pontosDec: "Apertada" } },
        { lutador1: "Isaac The Dablio", lutador2: "Miguel Bolinha", status: "Finalizada", cinturao: true, corCinturao: 'gold', resultado: { vencedor: "Isaac The Dablio", metodo: "SUB", round: 2, turno: "-", nomeDoEvento: "UFC 328" } }
    ]},
    { nome: "UFC Munich", lutasAgendadas: [
        { lutador1: "William Pretão", lutador2: "João Caralhão", status: "Finalizada", resultado: { vencedor: "William Pretão", metodo: "DEC", round: "-", turno: "-", nomeDoEvento: "UFC Munich" } },
        { lutador1: "Miguel Bolinha", lutador2: "Arthur Jackson", status: "Finalizada", resultado: { vencedor: "Miguel Bolinha", metodo: "SUB", round: 4, turno: "-", nomeDoEvento: "UFC Munich" } },
        { lutador1: "Antonella Di Marco", lutador2: "Joana The Pig", status: "Finalizada", cinturao: true, corCinturao: 'gold', resultado: { vencedor: "Antonella Di Marco", metodo: "SUB", round: 1, turno: "-", nomeDoEvento: "UFC Munich" } },
        { lutador1: "Enzo Dela Vega", lutador2: "Gonçalves", status: "Finalizada", cinturao: true, corCinturao: 'silver', resultado: { vencedor: "Enzo Dela Vega", metodo: "SUB", round: 4, turno: "-", nomeDoEvento: "UFC Munich" } }
    ]},
    { nome: "UFC 327", lutasAgendadas: [
        { lutador1: "Arthur Jackson", lutador2: "Bryan Brancão", status: "Finalizada", resultado: { vencedor: "Arthur Jackson", metodo: "SUB", round: 3, turno: "-", nomeDoEvento: "UFC 327" } },
        { lutador1: "Miguel Bolinha", lutador2: "William Pretão", status: "Finalizada", resultado: { vencedor: "Miguel Bolinha", metodo: "SUB", round: 2, turno: "-", nomeDoEvento: "UFC 327" } },
        { lutador1: "Nina Di Casteli", lutador2: "Mc Soares", status: "Finalizada", resultado: { vencedor: "Mc Soares", metodo: "SUB", round: 2, turno: "-", nomeDoEvento: "UFC 327" } }
    ]},
    { nome: "UFC 326", lutasAgendadas: [
        { lutador1: "Gonçalves", lutador2: "Volkanovski", status: "Finalizada", resultado: { vencedor: "Gonçalves", metodo: "SUB", round: 2, turno: "-", nomeDoEvento: "UFC 326" } },
        { lutador1: "Isaac The Dablio", lutador2: "Enzo Dela Vega", status: "Finalizada", cinturao: true, corCinturao: 'silver', resultado: { vencedor: "Enzo Dela Vega", metodo: "SUB", round: 2, turno: "-", nomeDoEvento: "UFC 326" } }
    ]},
    { nome: "UFC Barcelona", lutasAgendadas: [
        { lutador1: "Enzo Dela Vega", lutador2: "Gonçalves", status: "Finalizada", resultado: { vencedor: "Gonçalves", metodo: "KO", round: 1, turno: "-", nomeDoEvento: "UFC Barcelona" } },
        { lutador1: "Nina Di Casteli", lutador2: "Joana The Pig", status: "Finalizada", cinturao: true, corCinturao: 'gold', resultado: { vencedor: "Joana The Pig", metodo: "SUB", round: 3, turno: "-", nomeDoEvento: "UFC Barcelona" } }
    ]},
    { nome: "UFC 325", lutasAgendadas: [
        { lutador1: "Enzo Dela Vega", lutador2: "Miguel Bolinha", status: "Finalizada", resultado: { vencedor: "Enzo Dela Vega", metodo: "KO", round: 1, turno: "-", nomeDoEvento: "UFC 325" } },
        { lutador1: "Isaac The Dablio", lutador2: "Gonçalves", status: "Finalizada", cinturao: true, corCinturao: 'gold', resultado: { vencedor: "Isaac The Dablio", metodo: "KO", round: 2, turno: "-", nomeDoEvento: "UFC 325" } }
    ]},
    { nome: "UFC 324", lutasAgendadas: [
        { lutador1: "Isaac The Dablio", lutador2: "Gonçalves", status: "Finalizada", cinturao: true, corCinturao: 'gold', resultado: { vencedor: "Gonçalves", metodo: "KO", round: 3, turno: "-", nomeDoEvento: "UFC 324" } }
    ]}
  ]);

  const [eventoEmAndamento, setEventoEmAndamento] = useState(null);
  const [inputEventoEspecial, setInputEventoEspecial] = useState("");
  const [lutaAtualIdx, setLutaAtualIdx] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [lutador1, setLutador1] = useState(null);
  const [lutador2, setLutador2] = useState(null);
  const [rounds, setRounds] = useState(null);
  const [roundAtual, setRoundAtual] = useState(1);
  const [vida1, setVida1] = useState(200);
  const [vida2, setVida2] = useState(200);
  const [turnos1, setTurnos1] = useState(0);
  const [turnos2, setTurnos2] = useState(0);
  const [vezDeQuem, setVezDeQuem] = useState(null);
  const [dano, setDano] = useState("");
  const [alvoSelecionado, setAlvoSelecionado] = useState(null);
  const [metodoSelecionado, setMetodoSelecionado] = useState(null); 
  const [resultado, setResultado] = useState(null);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const vidaAnim1 = useState(new Animated.Value(200))[0];
  const vidaAnim2 = useState(new Animated.Value(200))[0];

  const lutadoresDB = {
    CARANGUEJO: ["Isaac The Dablio", "Miguel Bolinha", "Gonçalves", "João Caralhão", "Charles William", "William Pretão", "Pedro Bellingham", "Arthur Jackson", "Bryan Brancão", "Pedro Murilo"],
    TUBARÃO: ["Arthur China", "Thallysson W", "Luís Adolfo", "Benio The Black", "Gabriel Vertssapen", "Kaleb Khabib", "Enzo Dela Vega", "Luan Ologna"],
    FEMININO: ["Nina Di Casteli", "Joana The Pig", "Mc Soares", "Antonella Di Marco", "Volkova", "Mary", "Charlotte"],
  };

  const getLabelLuta = (index) => {
    if (modoTreino) return "TREINO";
    if (index === 0) return "MAIN EVENT";
    if (index === 1) return "CO-MAIN EVENT";
    return "PRELIMINARY EVENT";
  };

  const getContagemLutas = (p1, p2) => {
    let contador = 1;
    historicoEventos.forEach(ev => {
      ev.lutasAgendadas.forEach(l => {
        if ((l.lutador1 === p1 && l.lutador2 === p2) || (l.lutador1 === p2 && l.lutador2 === p1)) {
          contador++;
        }
      });
    });
    return contador > 1 ? ` ${contador}` : "";
  };

  const getProximoNumerado = () => {
    const numerados = historicoEventos.filter(ev => /^UFC \d+$/.test(ev.nome));
    if (numerados.length === 0) return 330;
    const nums = numerados.map(ev => parseInt(ev.nome.replace("UFC ", "")));
    return Math.max(...nums) + 1;
  };

  const getCartel = (nome) => {
    let v = 0, d = 0, e = 0;
    historicoEventos.flatMap(ev => ev.lutasAgendadas).forEach(l => {
        if (!l.resultado) return;
        if (l.lutador1 === nome || l.lutador2 === nome) {
            if (l.resultado.metodo === "EMPATE") e++;
            else if (l.resultado.vencedor === nome) v++;
            else d++;
        }
    });
    return `${v}-${d}-${e}`;
  };

  useEffect(() => {
    Animated.timing(vidaAnim1, { toValue: vida1, duration: 250, useNativeDriver: false }).start();
    if (vida1 <= 0 && tela === "luta") finalizarLuta("TKO", lutador2, turnos2, roundAtual);
  }, [vida1]);

  useEffect(() => {
    Animated.timing(vidaAnim2, { toValue: vida2, duration: 250, useNativeDriver: false }).start();
    if (vida2 <= 0 && tela === "luta") finalizarLuta("TKO", lutador1, turnos1, roundAtual);
  }, [vida2]);

  const registrarTurno = (num) => {
    setAlvoSelecionado(null);
    if (num === 1) { setTurnos1(t => Math.min(10, t + 1)); setVezDeQuem(2); } 
    else { setTurnos2(t => Math.min(10, t + 1)); setVezDeQuem(1); }
    if (turnos1 + turnos2 >= 19) {
        if (roundAtual < rounds) {
            setRoundAtual(r => r + 1);
            setTurnos1(0); setTurnos2(0);
        } else { setTela("decisao_vencedor"); }
    }
  };

  const finalizarLuta = (metodo, vencedor, turnoVenc, roundVenc, pontosDec = null) => {
    const res = { 
        vencedor, metodo, round: roundVenc, turno: turnoVenc, 
        lutador1, lutador2, tipoEventoLuta: getLabelLuta(lutaAtualIdx),
        nomeDoEvento: modoTreino ? "TREINO" : eventoEmAndamento.nome, pontosDec
    };

    if (!modoTreino) {
        const novasLutas = [...eventoEmAndamento.lutasAgendadas];
        novasLutas[lutaAtualIdx] = { ...novasLutas[lutaAtualIdx], status: "Finalizada", resultado: res };
        const novoEvento = { ...eventoEmAndamento, lutasAgendadas: novasLutas };
        setEventoEmAndamento(novoEvento);
        if (novasLutas.every(l => l.status === "Finalizada")) {
            setHistoricoEventos(prev => [novoEvento, ...prev]);
        }
    }
    
    setResultado(res);
    setTela("resultado");
  };

  const concluirLutaEResetar = () => {
    setVida1(200); setVida2(200);
    setTurnos1(0); setTurnos2(0);
    setRoundAtual(1);
    setMetodoSelecionado(null);
    setAlvoSelecionado(null);
    setVezDeQuem(null);
    setDano("");

    if (modoTreino) {
        setModoTreino(false);
        setLutador1(null); setLutador2(null);
        setTela("menu_inicial");
    } else {
        if (eventoEmAndamento.lutasAgendadas.every(l => l.status === "Finalizada")) {
            setEventoEmAndamento(null);
            setTela("menu_inicial");
        } else {
            setTela("continuar_evento");
        }
    }
  };

  // --- RENDERS ---

  if (tela === "menu_inicial") return (
    <View style={styles.containerCentro}>
      <View style={styles.header}><TouchableOpacity onPress={() => setMenuVisivel(true)} style={styles.hitboxMenu}><Text style={styles.tresPontos}>⋮</Text></TouchableOpacity></View>
      <Text style={styles.tituloPrincipal}>UFC | CIEMS</Text>
      
      <TouchableOpacity style={styles.botaoMain} onPress={() => { setModoTreino(false); setLutador1(null); setLutador2(null); setCategoria(null); setTela("selecao_tipo_evento"); }}>
        <Text style={styles.textoBotaoMain}>CRIAR NOVO EVENTO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.botaoMain, {marginTop: 15, backgroundColor: '#4b5563'}]} onPress={() => { setModoTreino(true); setLutador1(null); setLutador2(null); setCategoria(null); setTela("agendar_lutas"); }}>
        <Text style={styles.textoBotaoMain}>LUTA RÁPIDA (TREINO)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.botaoMain, {marginTop: 15, backgroundColor: eventoEmAndamento ? '#1e40af' : '#333'}]} onPress={() => eventoEmAndamento ? setTela("continuar_evento") : Alert.alert("Aviso", "Não há evento")}>
        <Text style={styles.textoBotaoMain}>CONTINUAR EVENTO</Text>
      </TouchableOpacity>

      <Modal visible={menuVisivel} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setMenuVisivel(false)}><View style={styles.modalMenu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => {setTela("hist_eventos"); setMenuVisivel(false)}}><Text style={styles.menuText}>Histórico de Eventos</Text></TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => {setTela("hist_lutadores"); setMenuVisivel(false); setCategoria(null); setItemSelecionado(null)}}><Text style={styles.menuText}>Histórico de Lutadores</Text></TouchableOpacity>
        </View></TouchableOpacity>
      </Modal>
    </View>
  );

  if (tela === "selecao_tipo_evento") return (
    <View style={styles.containerCentro}>
      <Text style={styles.titulo}>Tipo de Evento</Text>
      <TouchableOpacity style={styles.botao} onPress={() => { setEventoEmAndamento({ nome: `UFC ${getProximoNumerado()}`, lutasAgendadas: [] }); setCategoria(null); setTela("agendar_lutas"); }}><Text style={styles.textoBotao}>UFC NUMERADO</Text></TouchableOpacity>
      <TouchableOpacity style={styles.botao} onPress={() => { setEventoEmAndamento({ nome: "UFC FIGHT NIGHT", lutasAgendadas: [] }); setCategoria(null); setTela("agendar_lutas"); }}><Text style={styles.textoBotao}>UFC FIGHT NIGHT</Text></TouchableOpacity>
      <View style={styles.divisor} />
      <TextInput style={styles.input} placeholder="Nome Especial (ex: 300)" placeholderTextColor="#aaa" value={inputEventoEspecial} onChangeText={setInputEventoEspecial} />
      <TouchableOpacity style={styles.botaoAzul} onPress={() => { if(!inputEventoEspecial) return; setEventoEmAndamento({ nome: `UFC ${inputEventoEspecial}`, lutasAgendadas: [] }); setInputEventoEspecial(""); setCategoria(null); setTela("agendar_lutas"); }}><Text style={styles.textoBotao}>CRIAR ESPECIAL</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=>setTela("menu_inicial")}><Text style={styles.link}>Voltar</Text></TouchableOpacity>
    </View>
  );

  if (tela === "agendar_lutas") {
    const numLutas = eventoEmAndamento?.lutasAgendadas?.length || 0;
    const labelAtual = getLabelLuta(numLutas);
    const lutadoresOcupados = eventoEmAndamento?.lutasAgendadas?.flatMap(l => [l.lutador1, l.lutador2]) || [];
    return (
      <View style={styles.container}>
        <Text style={[styles.titulo, {color: modoTreino ? '#9ca3af' : '#2563eb'}]}>
          {modoTreino ? "TREINO: SELECIONE LUTADORES" : `AGENDAR: ${labelAtual}`}
        </Text>
        <ScrollView>
          {!categoria ? (
            Object.keys(lutadoresDB).map(cat => (<TouchableOpacity key={cat} style={styles.botao} onPress={() => setCategoria(cat)}><Text style={styles.textoBotao}>{cat}</Text></TouchableOpacity>))
          ) : (
            <>
              {lutadoresDB[categoria].map(n => {
                const ocupado = !modoTreino && lutadoresOcupados.includes(n);
                return (
                  <TouchableOpacity key={n} disabled={ocupado} style={[styles.botao, (lutador1===n || lutador2===n) && {backgroundColor: 'red'}, ocupado && {opacity: 0.2}]} onPress={() => { if(lutador1===n)setLutador1(null); else if(lutador2===n)setLutador2(null); else if(!lutador1)setLutador1(n); else if(!lutador2)setLutador2(n); }}>
                    <Text style={styles.textoBotao}>{n}</Text>
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity onPress={() => setCategoria(null)}><Text style={styles.link}>Voltar Categorias</Text></TouchableOpacity>
            </>
          )}

          {lutador1 && lutador2 && (
            <View style={{marginTop: 20, padding: 10, backgroundColor: '#111', borderRadius: 10}}>
              {!modoTreino && (
                <>
                <Text style={{color: '#fff', textAlign: 'center', marginBottom: 10, fontWeight: 'bold'}}>Configurar Disputa</Text>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.botaoCinturaoOpcao, valeCinturao === 'gold' && {backgroundColor: '#FFD700', borderColor: '#fff'}]} onPress={() => setValeCinturao(valeCinturao === 'gold' ? null : 'gold')}>
                        <Text style={[styles.textoBotaoCint, valeCinturao === 'gold' && {color: '#000'}]}>CINTURÃO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.botaoCinturaoOpcao, valeCinturao === 'silver' && {backgroundColor: '#C0C0C0', borderColor: '#fff'}]} onPress={() => setValeCinturao(valeCinturao === 'silver' ? null : 'silver')}>
                        <Text style={[styles.textoBotaoCint, valeCinturao === 'silver' && {color: '#000'}]}>CINTURÃO BMF</Text>
                    </TouchableOpacity>
                </View>
                </>
              )}

              <TouchableOpacity style={modoTreino ? styles.botaoVerde : styles.botaoAzul} onPress={() => {
                if(modoTreino) {
                    setTela("escolher_rounds");
                } else {
                    const numContagem = getContagemLutas(lutador1, lutador2);
                    setEventoEmAndamento(prev => ({
                    ...prev, 
                    lutasAgendadas: [...prev.lutasAgendadas, {
                        lutador1, lutador2, contagem: numContagem, status: "Pendente",
                        cinturao: valeCinturao !== null, corCinturao: valeCinturao
                    }]
                    }));
                    setLutador1(null); setLutador2(null); setCategoria(null); setValeCinturao(null);
                }
              }}><Text style={styles.textoBotao}>{modoTreino ? "INICIAR TREINO" : `Confirmar ${labelAtual}`}</Text></TouchableOpacity>
            </View>
          )}
        </ScrollView>
        {!modoTreino && numLutas > 0 && <TouchableOpacity style={styles.botaoVerde} onPress={() => setTela("menu_inicial")}><Text style={styles.textoBotao}>Finalizar Agendamento</Text></TouchableOpacity>}
        <TouchableOpacity onPress={()=>setTela("menu_inicial")}><Text style={styles.link}>Cancelar</Text></TouchableOpacity>
      </View>
    );
  }

  if (tela === "luta") {
    const alvoBloqueado = (id) => {
        if (vezDeQuem === 1) return id === 1; 
        if (vezDeQuem === 2) return id === 2; 
        return false;
    };
    return (
      <View style={styles.container}>
        {modoTreino && <View style={styles.tagTreino}><Text style={styles.tagTreinoTxt}>MODO TREINO - NÃO SALVA</Text></View>}
        <Text style={styles.headerLuta}>{modoTreino ? "SPARRING" : eventoEmAndamento?.nome} | {getLabelLuta(lutaAtualIdx)}</Text>
        <Text style={{color: '#fff', textAlign: 'center'}}>R {roundAtual} / {rounds}</Text>
        
        {/* Lutador 1 */}
        <View style={styles.rowStatus}><Text style={styles.nome}>{lutador1}</Text><Text style={styles.turnoLabel}>T : {turnos1}</Text></View>
        <Animated.View style={[styles.barra, { width: vidaAnim1.interpolate({ inputRange: [0, 200], outputRange: ["0%", "100%"] }), backgroundColor: "#22c55e" }]} />
        <TouchableOpacity disabled={vezDeQuem === 2} style={[styles.botaoTurno, vezDeQuem === 2 && { opacity: 0.3 }]} onPress={() => registrarTurno(1)}><Text style={styles.textoBotao}>Turno {lutador1}</Text></TouchableOpacity>
        
        {/* Lutador 2 */}
        <View style={styles.rowStatus}><Text style={styles.nome}>{lutador2}</Text><Text style={styles.turnoLabel}>T : {turnos2}</Text></View>
        <Animated.View style={[styles.barra, { width: vidaAnim2.interpolate({ inputRange: [0, 200], outputRange: ["0%", "100%"] }), backgroundColor: "#22c55e" }]} />
        <TouchableOpacity disabled={vezDeQuem === 1} style={[styles.botaoTurno, vezDeQuem === 1 && { opacity: 0.3 }]} onPress={() => registrarTurno(2)}><Text style={styles.textoBotao}>Turno {lutador2}</Text></TouchableOpacity>
        
        <View style={styles.divisor} />
        
        <TextInput style={styles.input} placeholder="Dano" placeholderTextColor="#aaa" value={dano} onChangeText={setDano} keyboardType="numeric" onFocus={() => setMetodoSelecionado('DANO')} />
        
        <View style={styles.row}>
          <TouchableOpacity disabled={alvoBloqueado(1)} style={[styles.botaoCinza, alvoSelecionado===1 && {backgroundColor:'red'}, alvoBloqueado(1) && {opacity: 0.1}]} onPress={()=>setAlvoSelecionado(1)}>
            <Text style={styles.textoBotaoAlvo}>Alvo: {lutador1}</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={alvoBloqueado(2)} style={[styles.botaoCinza, alvoSelecionado===2 && {backgroundColor:'red'}, alvoBloqueado(2) && {opacity: 0.1}]} onPress={()=>setAlvoSelecionado(2)}>
            <Text style={styles.textoBotaoAlvo}>Alvo: {lutador2}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.ko, metodoSelecionado==='KO' && {borderWidth:2, borderColor:'#fff'}]} onPress={()=>setMetodoSelecionado('KO')}><Text style={styles.textoBotao}>KO</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.tko, metodoSelecionado==='TKO' && {borderWidth:2, borderColor:'#fff'}]} onPress={()=>setMetodoSelecionado('TKO')}><Text style={styles.textoBotao}>TKO</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.sub, metodoSelecionado==='SUB' && {borderWidth:2, borderColor:'#fff'}]} onPress={()=>setMetodoSelecionado('SUB')}><Text style={styles.textoBotao}>SUB</Text></TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.botaoVerde} onPress={() => {
            if (!alvoSelecionado || !metodoSelecionado) return;
            if (metodoSelecionado === 'DANO') {
                const v = parseInt(dano); if (!v) return;
                if (alvoSelecionado === 1) setVida1(p => Math.max(0, p - v)); else setVida2(p => Math.max(0, p - v));
                setDano("");
            } else { finalizarLuta(metodoSelecionado, alvoSelecionado === 1 ? lutador2 : lutador1, alvoSelecionado === 1 ? turnos2 : turnos1, roundAtual); }
        }}><Text style={styles.textoBotao}>CONFIRMAR AÇÃO</Text></TouchableOpacity>
        
        <TouchableOpacity onPress={()=>setTela("menu_inicial")}><Text style={styles.link}>Abandonar Luta</Text></TouchableOpacity>
      </View>
    );
  }

  if (tela === "resultado") return (
    <View style={styles.containerCentro}>
      {modoTreino && <Text style={{color: '#aaa', textAlign: 'center', marginBottom: 10}}>FIM DO TREINO</Text>}
      <Text style={styles.titulo}>RESULTADO</Text>
      <Text style={styles.vencedorNome}>{resultado?.vencedor}</Text>
      <Text style={styles.metodoTxt}>{resultado?.metodo} {resultado?.pontosDec || ""}</Text>
      <Text style={styles.metodoTxt}>{resultado?.metodo !== "DEC" && resultado?.metodo !== "EMPATE" ? `Round ${resultado?.round} - T : ${resultado?.turno}` : ""}</Text>
      <TouchableOpacity style={styles.botaoAzul} onPress={concluirLutaEResetar}><Text style={styles.textoBotao}>VOLTAR AO MENU</Text></TouchableOpacity>
    </View>
  );

  if (tela === "hist_eventos") return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico de Eventos</Text>
      <ScrollView>
        {historicoEventos.map((ev, i) => (
          <View key={i} style={styles.cardEventoCompleto}>
            <View style={styles.headerCardEvento}>
              <Text style={styles.nomeEventoTitulo}>{ev.nome}</Text>
              <TouchableOpacity onPress={() => Alert.alert("Excluir", `Apagar ${ev.nome}?`, [{text: "Não"}, {text: "Sim", onPress: () => setHistoricoEventos(historicoEventos.filter((_, idx) => idx !== i))}])}>
                <Text style={{color: '#ef4444', fontWeight: 'bold'}}>EXCLUIR</Text>
              </TouchableOpacity>
            </View>
            {ev.lutasAgendadas.map((l, j) => (
              <View key={j} style={styles.subCardLuta}>
                <View style={styles.rowLutaHist}>
                  <View style={{flex: 1}}><Text style={styles.confrontoTexto}>{l.lutador1} <Text style={{color: '#444'}}>vs</Text> {l.lutador2}{l.contagem || ""}</Text></View>
                  {l.cinturao && <IconeCinturao cor={l.corCinturao} />}
                </View>
                <View style={styles.resultadoContainer}>
                  <Text style={styles.vencedorLabel}>VENCEDOR: <Text style={{color: '#fff'}}>{l.resultado?.vencedor}</Text></Text>
                  <Text style={styles.detalheResultado}>{l.resultado?.metodo} {l.resultado?.metodo === "DEC" ? `- DEC` : `- R${l.resultado?.round} (T:${l.resultado?.turno})`}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={()=>setTela("menu_inicial")}><Text style={styles.link}>Voltar</Text></TouchableOpacity>
    </View>
  );

  if (tela === "hist_lutadores") return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico de Lutadores</Text>
      <ScrollView>
        {!categoria ? (Object.keys(lutadoresDB).map(cat => (<TouchableOpacity key={cat} style={styles.botao} onPress={() => setCategoria(cat)}><Text style={styles.textoBotao}>{cat}</Text></TouchableOpacity>))) : !itemSelecionado ? (
          <>{lutadoresDB[categoria].map(n => (<TouchableOpacity key={n} style={styles.botao} onPress={() => setItemSelecionado(n)}><Text style={styles.textoBotao}>{n} ({getCartel(n)})</Text></TouchableOpacity>))}
            <TouchableOpacity onPress={() => setCategoria(null)}><Text style={styles.link}>Voltar</Text></TouchableOpacity></>
        ) : (
          <View>
            <Text style={styles.vencedorNome}>{itemSelecionado}</Text>
            <Text style={[styles.metodoTxt, {fontSize: 20, color: '#2563eb', fontWeight: 'bold'}]}>{getCartel(itemSelecionado)}</Text>
            {historicoEventos.flatMap(ev => ev.lutasAgendadas).filter(l => l.resultado && (l.lutador1 === itemSelecionado || l.lutador2 === itemSelecionado)).map((l, i) => (
                <View key={i} style={styles.subCardLuta}>
                  <Text style={{color: l.resultado.vencedor === itemSelecionado ? '#22c55e' : '#ef4444', fontWeight: 'bold', fontSize: 12, marginBottom: 5}}>{l.resultado.vencedor === itemSelecionado ? "VITÓRIA" : "DERROTA"}</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>{l.lutador1} vs {l.lutador2}{l.contagem || ""}</Text>
                    {l.cinturao && <IconeCinturao cor={l.corCinturao} />}
                  </View>
                  <Text style={{color: '#666', fontSize: 11, marginTop: 4}}>{l.resultado.nomeDoEvento}</Text>
                  <Text style={{color: '#aaa', fontSize: 12, marginTop: 2}}>{l.resultado.metodo} {l.resultado.metodo === "DEC" ? "" : `- R${l.resultado.round} (T:${l.resultado.turno})`}</Text>
                </View>
            ))}
            <TouchableOpacity onPress={() => setItemSelecionado(null)}><Text style={styles.link}>Voltar</Text></TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity onPress={()=>setTela("menu_inicial")}><Text style={styles.link}>Voltar</Text></TouchableOpacity>
    </View>
  );

  if (tela === "continuar_evento") return (
    <View style={styles.container}>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}><Text style={styles.titulo}>{eventoEmAndamento?.nome}</Text>
      <TouchableOpacity onPress={() => {Alert.alert("Excluir", "Deseja apagar?", [{text: "Sim", onPress: () => {setEventoEmAndamento(null); setTela("menu_inicial");}}, {text: "Não"}])}}><Text style={{color:'red', fontWeight:'bold'}}>EXCLUIR</Text></TouchableOpacity></View>
      {eventoEmAndamento?.lutasAgendadas?.map((l, idx) => (
        <View key={idx} style={styles.cardLuta}>
            <TouchableOpacity disabled={l.status === "Finalizada"} style={{flex: 1}} onPress={() => { setLutador1(l.lutador1); setLutador2(l.lutador2); setLutaAtualIdx(idx); setTela("escolher_rounds"); }}><Text style={{color: '#2563eb', fontSize: 10}}>{getLabelLuta(idx)}</Text><Text style={styles.textoLuta}>{l.lutador1} vs {l.lutador2}{l.contagem || ""} {l.status === "Finalizada" ? "(OK)" : ""}</Text></TouchableOpacity>
            {l.status !== "Finalizada" && <TouchableOpacity onPress={() => setEventoEmAndamento({...eventoEmAndamento, lutasAgendadas: eventoEmAndamento.lutasAgendadas.filter((_, i) => i !== idx)})}><Text style={{color:'red', fontSize: 10}}>Remover</Text></TouchableOpacity>}
        </View>
      ))}
      <TouchableOpacity style={styles.botaoAzul} onPress={() => {setCategoria(null); setTela("agendar_lutas");}}><Text style={styles.textoBotao}>ADICIONAR LUTA</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=>setTela("menu_inicial")}><Text style={styles.link}>Voltar</Text></TouchableOpacity>
    </View>
  );

  if (tela === "escolher_rounds") return (
    <View style={styles.containerCentro}>
      <Text style={styles.titulo}>Rounds?</Text>
      {[3, 5].map(r => (<TouchableOpacity key={r} style={styles.botao} onPress={() => {setRounds(r); setTela("luta")}}><Text style={styles.textoBotao}>{r} ROUNDS</Text></TouchableOpacity>))}
      <TouchableOpacity onPress={()=>setTela(modoTreino ? "agendar_lutas" : "continuar_evento")}><Text style={styles.link}>Voltar</Text></TouchableOpacity>
    </View>
  );

  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20, paddingTop: 60 },
  containerCentro: { flex: 1, backgroundColor: "#000", justifyContent: "center", padding: 20 },
  header: { position: 'absolute', top: 40, right: 10, zIndex: 10 },
  hitboxMenu: { padding: 30 },
  tresPontos: { color: 'white', fontSize: 45, fontWeight: 'bold' },
  tituloPrincipal: { color: "#fff", fontSize: 32, textAlign: "center", marginBottom: 50, fontWeight: "bold" },
  titulo: { color: "#fff", fontSize: 22, textAlign: "center", marginBottom: 20, fontWeight: "bold" },
  botaoMain: { backgroundColor: "#2563eb", padding: 20, borderRadius: 15, alignItems: "center" },
  textoBotaoMain: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  botao: { backgroundColor: "#222", padding: 15, borderRadius: 10, marginVertical: 5, alignItems: "center" },
  botaoAzul: { backgroundColor: "#2563eb", padding: 15, borderRadius: 10, marginTop: 15, alignItems: "center" },
  botaoVerde: { backgroundColor: "#16a34a", padding: 15, borderRadius: 10, marginTop: 15, alignItems: "center" },
  textoBotao: { color: "#fff", fontWeight: "bold" },
  textoBotaoAlvo: { color: "#fff", fontWeight: "bold", fontSize: 10 }, 
  link: { color: '#2563eb', textAlign: 'center', marginTop: 20, fontWeight: 'bold' },
  headerLuta: { color: 'red', textAlign: 'center', fontWeight: 'bold', marginBottom: 5 },
  rowStatus: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  nome: { color: "#fff", fontWeight: "bold" },
  turnoLabel: { color: "#2563eb", fontWeight: 'bold' },
  barra: { height: 12, borderRadius: 6, marginVertical: 5 },
  botaoTurno: { backgroundColor: "#1e40af", padding: 12, borderRadius: 8, alignItems: "center" },
  divisor: { height: 1, backgroundColor: "#333", marginVertical: 20 },
  input: { backgroundColor: "#111", color: "#fff", padding: 15, borderRadius: 10, marginBottom: 10, textAlign: 'center', fontSize: 18 },
  row: { flexDirection: "row", marginTop: 5 },
  botaoCinza: { backgroundColor: "#444", padding: 12, borderRadius: 10, margin: 5, flex: 1, alignItems: "center" },
  ko: { backgroundColor: "#991b1b", flex: 1, padding: 15, borderRadius: 10, margin: 5, alignItems: "center" },
  tko: { backgroundColor: "#b45309", flex: 1, padding: 15, borderRadius: 10, margin: 5, alignItems: "center" },
  sub: { backgroundColor: "#166534", flex: 1, padding: 15, borderRadius: 10, margin: 5, alignItems: "center" },
  vencedorNome: { color: '#fff', fontSize: 30, textAlign: 'center', fontWeight: 'bold', marginBottom: 10 },
  metodoTxt: { color: '#aaa', textAlign: 'center', marginBottom: 10 },
  cardLuta: { backgroundColor: '#111', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center' },
  textoLuta: { color: 'white', fontWeight: 'bold' },
  cardEventoCompleto: { backgroundColor: "#000", marginBottom: 25, borderBottomWidth: 1, borderBottomColor: '#222', paddingBottom: 10 },
  headerCardEvento: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingHorizontal: 5 },
  nomeEventoTitulo: { color: 'red', fontWeight: 'bold', fontSize: 24 },
  subCardLuta: { backgroundColor: "#111", padding: 15, borderRadius: 12, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#2563eb' },
  rowLutaHist: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  confrontoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resultadoContainer: { marginTop: 10, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#222' },
  vencedorLabel: { color: '#22c55e', fontSize: 12, fontWeight: 'bold' },
  detalheResultado: { color: '#aaa', fontSize: 11, marginTop: 2 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' },
  modalMenu: { position: 'absolute', top: 100, right: 20, backgroundColor: '#111', borderRadius: 15, width: 220, borderWidth: 1, borderColor: '#333' },
  menuItem: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#222' },
  menuText: { color: 'white', fontWeight: 'bold' },
  cinturaoContainer: { width: 30, height: 15, justifyContent: 'center', alignItems: 'center' },
  cinturaoBase: { width: 30, height: 8, borderRadius: 2, position: 'absolute' },
  cinturaoCirculo: { width: 12, height: 12, borderRadius: 6, borderWidth: 1, borderColor: '#333' },
  botaoCinturaoOpcao: { flex: 1, padding: 12, backgroundColor: '#222', borderRadius: 8, margin: 5, alignItems: 'center', borderWidth: 1, borderColor: '#444' },
  textoBotaoCint: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  tagTreino: { backgroundColor: '#444', padding: 5, borderRadius: 5, alignSelf: 'center', marginBottom: 5 },
  tagTreinoTxt: { color: '#fff', fontSize: 9, fontWeight: 'bold' }
});
