export run_opf, run_opf_tr, run_opf_tp, run_ac_opf, run_dc_opf

""
function run_ac_opf(file, optimizer; kwargs...)
    return run_opf_tr(file, ACPPowerModel, optimizer; kwargs...)
end

""
function run_dc_opf(file, optimizer; kwargs...)
    return run_opf_tp(file, DCPPowerModel, optimizer; kwargs...)
end

""
function run_opf_tr(file, model_constructor, optimizer; kwargs...)
    return run_generic_model(file, model_constructor, optimizer, post_opf_tr; kwargs...)
end

"default opf formulation"
run_opf = run_opf_tr

"an opf formulation with transformers in rectangular coordinates"
function post_opf_tr(pm::GenericPowerModel)
    variable_voltage(pm)
    variable_generation(pm)
    variable_branch_flow(pm)
    variable_dcline_flow(pm)

    objective_min_fuel_and_flow_cost(pm)

    constraint_voltage(pm)

    for i in ids(pm, :ref_buses)
        constraint_theta_ref(pm, i)
    end

    for i in ids(pm, :bus)
        constraint_kcl_shunt(pm, i)
    end

    for i in ids(pm, :branch)
        constraint_ohms_yt_from(pm, i)
        constraint_ohms_yt_to(pm, i)

        constraint_voltage_angle_difference(pm, i)

        constraint_thermal_limit_from(pm, i)
        constraint_thermal_limit_to(pm, i)
    end

    for i in ids(pm, :dcline)
        constraint_dcline(pm, i)
    end
end


""
function run_opf_tp(file, model_constructor, optimizer; kwargs...)
    return run_generic_model(file, model_constructor, optimizer, post_opf_tp; kwargs...)
end

"an opf formulation with transformers in polar coordinates"
function post_opf_tp(pm::GenericPowerModel)
    variable_voltage(pm)
    variable_generation(pm)
    variable_branch_flow(pm)
    variable_dcline_flow(pm)

    objective_min_fuel_and_flow_cost(pm)

    constraint_voltage(pm)

    for i in ids(pm,:ref_buses)
        constraint_theta_ref(pm, i)
    end

    for i in ids(pm,:bus)
        constraint_kcl_shunt(pm, i)
    end

    for i in ids(pm,:branch)
        constraint_ohms_y_from(pm, i)
        constraint_ohms_y_to(pm, i)

        constraint_voltage_angle_difference(pm, i)

        constraint_thermal_limit_from(pm, i)
        constraint_thermal_limit_to(pm, i)
    end

    for i in ids(pm,:dcline)
        constraint_dcline(pm, i)
    end
end

